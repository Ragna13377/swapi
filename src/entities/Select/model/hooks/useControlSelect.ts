import {
	Dispatch,
	RefObject,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { isPrintableKey } from '@shared/utils/keyboardUtils';
import { SelectProps, TSelectOption } from '../../types';
import { SelectControlKeys as KEY } from '../../constants';
import { findOptionByKey } from '../../utils';

type UseSelectProps = Pick<SelectProps, 'onChange' | 'options'> & {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	selectRef: RefObject<HTMLDivElement | null>;
	dropdownRef: RefObject<HTMLUListElement | null>;
};

export const useControlSelect = ({
	isOpen,
	setIsOpen,
	selectRef,
	dropdownRef,
	onChange,
	options,
}: UseSelectProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);

	const shouldBlockInteraction = options.length <= 1;
	const handleNavigation = useCallback(
		(key: string) => {
			if (shouldBlockInteraction) return highlightedIndex;
			switch (key) {
				case KEY.HOME:
					return 0;
				case KEY.END:
					return options.length - 1;
				case KEY.ARROW_UP:
				case KEY.ARROW_LEFT:
					return (highlightedIndex - 1 + options.length) % options.length;
				case KEY.ARROW_DOWN:
				case KEY.ARROW_RIGHT:
					return (highlightedIndex + 1) % options.length;
				default:
					return highlightedIndex;
			}
		},
		[shouldBlockInteraction, highlightedIndex, options]
	);
	const handleKeyAction = (e: React.KeyboardEvent, isMenuOpen: boolean) => {
		if (shouldBlockInteraction) {
			e.preventDefault();
			return;
		}

		const { key } = e;
		const prevent = () => e.preventDefault();

		if (key === KEY.ESCAPE && isMenuOpen) {
			prevent();
			setIsOpen(false);
			return;
		}

		if (key === KEY.TAB && isMenuOpen) {
			setIsOpen(false);
			return;
		}

		if (key === KEY.ENTER) {
			if (isMenuOpen && highlightedIndex >= 0) {
				prevent();
				onChange(options[highlightedIndex]);
				setIsOpen(false);
			} else if (!isMenuOpen) {
				prevent();
				setIsOpen(true);
			}
			return;
		}

		if (key === KEY.SPACE && !isMenuOpen) {
			prevent();
			setIsOpen(true);
			return;
		}

		const newIndex = handleNavigation(key);
		if (newIndex !== highlightedIndex) {
			prevent();
			setHighlightedIndex(newIndex);
			if (!isMenuOpen) {
				onChange(options[newIndex]);
			}
		}

		if (isPrintableKey(key)) {
			const foundIndex = isMenuOpen
				? findOptionByKey(options, key)
				: findOptionByKey(options, key, highlightedIndex + 1);
			if (foundIndex >= 0) {
				setHighlightedIndex(foundIndex);
			}
			if (!isMenuOpen) {
				onChange(options[foundIndex]);
			}
		}
	};

	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (!selectRef.current || !dropdownRef.current) return;
			const target = e.target as Node;
			if (
				!selectRef.current.contains(target) &&
				!dropdownRef.current.contains(target)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('pointerdown', handleClickOutside);
		return () =>
			document.removeEventListener('pointerdown', handleClickOutside);
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && highlightedIndex >= 0 && dropdownRef.current) {
			const option = dropdownRef.current.querySelector(
				`[data-index="${highlightedIndex}"]`
			) as HTMLElement;
			option?.scrollIntoView({ block: 'nearest' });
		}
	}, [highlightedIndex, isOpen]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (!isFocused || shouldBlockInteraction) return;
			handleKeyAction(e, isOpen);
		},
		[isFocused, isOpen, handleKeyAction, shouldBlockInteraction]
	);

	const handleOptionClick = useCallback(
		(option: TSelectOption) => {
			onChange(option);
			setIsOpen(false);
			selectRef.current?.focus();
		},
		[onChange, selectRef]
	);

	return {
		highlightedIndex,
		changeHighlightedIndex: (index: number) => setHighlightedIndex(index),
		handleKeyDown,
		handleOptionClick,
		handleFocus: () => setIsFocused(true),
	};
};

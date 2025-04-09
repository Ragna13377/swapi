import {
	Dispatch,
	RefObject,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { TDropdownPosition } from '@entities/Select/types';
import {
	dropdownEstimatedHeight,
	dropDownOffset,
} from '@entities/Select/constants';
import { throttle } from '@shared/utils/performanceUtils';
import { defaultDelay } from '@shared/constants';

type UseDropdownPositionProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	selectRef: RefObject<HTMLDivElement | null>;
	optionsCount: number;
};
export const useDropdownPosition = ({
	isOpen,
	setIsOpen,
	selectRef,
	optionsCount,
}: UseDropdownPositionProps) => {
	const shouldBlockDropdown = optionsCount <= 1;
	const calculateInitialPosition = useCallback((): TDropdownPosition => {
		if (!selectRef.current || shouldBlockDropdown) {
			return { top: 0, left: 0, width: 0, direction: 'bottom' };
		}

		const rect = selectRef.current.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const spaceBelow = viewportHeight - rect.bottom;
		const spaceAbove = rect.top;
		const showAbove =
			spaceBelow < dropdownEstimatedHeight &&
			spaceAbove > dropdownEstimatedHeight;

		return {
			top: showAbove
				? rect.top + window.scrollY - dropdownEstimatedHeight - dropDownOffset
				: rect.bottom + window.scrollY + dropDownOffset,
			left: rect.left + window.scrollX,
			width: rect.width,
			direction: showAbove ? 'top' : 'bottom',
		};
	}, [selectRef, shouldBlockDropdown]);
	const [position, setPosition] = useState(() => calculateInitialPosition());
	const throttledUpdate = useMemo(
		() =>
			throttle(() => {
				if (!selectRef.current || shouldBlockDropdown) return;
				setPosition(calculateInitialPosition());
			}, defaultDelay),
		[selectRef, shouldBlockDropdown, calculateInitialPosition]
	);

	useEffect(() => {
		if (!isOpen || shouldBlockDropdown) return;
		throttledUpdate();

		window.addEventListener('scroll', throttledUpdate, true);
		window.addEventListener('resize', throttledUpdate);

		return () => {
			window.removeEventListener('scroll', throttledUpdate, true);
			window.removeEventListener('resize', throttledUpdate);
		};
	}, [isOpen, shouldBlockDropdown]);

	const handleToggle = useCallback(() => {
		if (shouldBlockDropdown) return;
		setIsOpen((prev) => {
			if (!prev) setPosition(calculateInitialPosition());
			return !prev;
		});
	}, [setIsOpen, shouldBlockDropdown]);
	return {
		position,
		handleToggle,
	};
};

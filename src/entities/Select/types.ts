import { Ref } from 'react';

export type TSelectOption = {
	value: string;
	label: string;
};

export type TDropdownPosition = {
	top: number;
	left: number;
	width: number;
	direction: 'top' | 'bottom';
};

export type SelectProps = {
	id: string;
	activeValue: TSelectOption | null;
	options: TSelectOption[];
	onChange: (option: TSelectOption) => void;
	label?: string;
	placeholder?: string;
};

export type SelectUIProps = Omit<SelectProps, 'onChange'> & {
	selectRef: Ref<HTMLDivElement>;
	dropdownRef: Ref<HTMLUListElement>;
	isOpen: boolean;
	highlightedIndex: number;
	changeHighlightedIndex: (index: number) => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	handleFocus: () => void;
	handleOptionClick: (option: TSelectOption) => void;
	position: TDropdownPosition;
	handleToggle: () => void;
};

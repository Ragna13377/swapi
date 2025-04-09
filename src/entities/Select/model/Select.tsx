import { SelectProps } from '../types';
import SelectUI from '../ui/SelectUI';
import { useControlSelect } from '@entities/Select/model/hooks/useControlSelect';
import { useRef, useState } from 'react';
import { useDropdownPosition } from '@entities/Select/model/hooks/useDropdownPosition';

export const Select = ({ options, onChange, ...props }: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLUListElement>(null);
	const selectData = useControlSelect({
		isOpen,
		setIsOpen,
		selectRef,
		dropdownRef,
		options,
		onChange,
	});
	const dropdownPosition = useDropdownPosition({
		isOpen,
		setIsOpen,
		selectRef,
		optionsCount: options.length,
	});
	return (
		<SelectUI
			options={options}
			selectRef={selectRef}
			dropdownRef={dropdownRef}
			isOpen={isOpen}
			{...props}
			{...selectData}
			{...dropdownPosition}
		/>
	);
};

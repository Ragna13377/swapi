import { SelectUIProps } from '../types';
import { SelectDropdown } from '../components/SelectDropdown';
import {
	StyledSelect,
	StyledSelectLabel,
	StyledSelectText,
	StyledSelectWrapper,
} from './styles';

const SelectUI = ({
	id,
	activeValue,
	selectRef,
	dropdownRef,
	isOpen,
	highlightedIndex,
	handleKeyDown,
	handleToggle,
	handleFocus,
	label,
	placeholder = 'Select...',
	...dropdownProps
}: SelectUIProps) => (
	<StyledSelectWrapper>
		{label && (
			<StyledSelectLabel id={`${id}-label`} htmlFor={id}>
				{label}
			</StyledSelectLabel>
		)}
		<StyledSelect
			ref={selectRef}
			id={id}
			tabIndex={0}
			role='combobox'
			aria-haspopup='listbox'
			aria-expanded={isOpen}
			aria-labelledby={`${id}-label ${id}-value`}
			aria-label={isOpen ? 'Close dropdown' : 'Open dropdown'}
			aria-controls={`${id}-listbox`}
			aria-activedescendant={
				isOpen ? `${id}-option-${highlightedIndex}` : undefined
			}
			$isOpen={isOpen}
			onKeyDown={handleKeyDown}
			onFocus={handleFocus}
			onClick={handleToggle}
		>
			<StyledSelectText id={`${id}-value`} aria-hidden>
				{activeValue?.label || placeholder}
			</StyledSelectText>
		</StyledSelect>
		{isOpen && (
			<SelectDropdown
				ref={dropdownRef}
				id={`${id}-listbox`}
				highlightedIndex={highlightedIndex}
				activeValue={activeValue}
				{...dropdownProps}
			/>
		)}
	</StyledSelectWrapper>
);

export default SelectUI;

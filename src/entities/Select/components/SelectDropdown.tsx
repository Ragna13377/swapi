import { createPortal } from 'react-dom';
import { css, styled } from 'styled-components';
import { TDropdownPosition, TSelectOption } from '@entities/Select/types';
import { theme } from '@shared/themes';

type SelectDropdownProps = {
	id: string;
	options: TSelectOption[];
	position: TDropdownPosition;
	activeValue: TSelectOption | null;
	highlightedIndex: number;
	handleOptionClick: (option: TSelectOption) => void;
	changeHighlightedIndex: (index: number) => void;
	ref: React.Ref<HTMLUListElement>;
};

const StyledSelectDropdown = styled.ul<Pick<SelectDropdownProps, 'position'>>`
	position: absolute;
	inset-block-start: ${({ position }) => `${position.top}px`};
	inset-inline-start: ${({ position }) => `${position.left}px`};
	width: ${({ position }) => `${position.width}px`};
	background: ${theme.colors.cardBackground};
	box-shadow: 0.25rem 0.25rem 0.5rem 0 hsla(214, 97%, 13%, 0.2);
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;
const StyledDropdownElement = styled.li<{ $isHighlighted: boolean }>`
	padding-block: 0.5rem;
	font-weight: 400;
	font-size: 1rem;
	line-height: 1;
	letter-spacing: 0;
	text-align: center;
	background: transparent;
	cursor: pointer;

	${({ $isHighlighted }) =>
		$isHighlighted &&
		css`
			background-color: ${theme.colors.highlightedColor};
		`}
`;

export const SelectDropdown = ({
	id,
	options,
	position,
	highlightedIndex,
	activeValue,
	handleOptionClick,
	changeHighlightedIndex,
	ref,
}: SelectDropdownProps) =>
	createPortal(
		<StyledSelectDropdown
			ref={ref}
			id={id}
			role='listbox'
			aria-labelledby={`${id}-label`}
			position={position}
		>
			{options.map((option, index) => (
				<StyledDropdownElement
					key={option.value}
					id={`${id}-option-${index}`}
					role='option'
					aria-selected={activeValue?.value === option.value}
					data-index={index}
					$isHighlighted={highlightedIndex === index}
					onClick={() => handleOptionClick(option)}
					onMouseEnter={() => changeHighlightedIndex(index)}
				>
					{option.label}
				</StyledDropdownElement>
			))}
		</StyledSelectDropdown>,
		document.body
	);

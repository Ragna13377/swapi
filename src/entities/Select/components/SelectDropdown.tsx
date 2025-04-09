import { createPortal } from 'react-dom';
import { css, styled } from 'styled-components';
import { TDropdownPosition, TSelectOption } from '@entities/Select/types';

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
	background: hsla(0, 0%, 95%, 1);
	box-shadow: 4px 4px 8px 0px hsla(214, 97%, 13%, 0.2);
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;
const StyledDropdownElement = styled.li<{ $isHighlighted: boolean }>`
	padding-block: 6px;
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
			background-color: #e3e3e3;
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

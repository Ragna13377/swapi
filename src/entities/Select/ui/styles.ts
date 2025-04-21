import { styled } from 'styled-components';

export const StyledSelect = {
	Wrapper: styled.div`
		inline-size: clamp(8rem, fit-content, 10rem);
		font-weight: 400;
		font-size: clamp(1rem, calc(1rem + 0.25vw), 1.125rem);
		line-height: 1;
		letter-spacing: 0;
	`,
	Label: styled.label`
		display: block;
		margin-block-end: 0.5rem;
		font-weight: 700;
	`,
	Text: styled.p`
		inline-size: 100%;
		padding-inline-end: 1.5rem;
		text-align: center;
		pointer-events: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	`,
	Select: styled.div<{ $isOpen: boolean }>`
		position: relative;
		inline-size: 100%;
		block-size: 100%;
		padding: 0.3125rem 0.625rem;
		border-radius: 0.25rem;
		background: hsla(0, 0%, 95%, 1);
		box-shadow: 0.125rem 0.125rem 0.125rem 0px hsla(0, 0%, 13%, 0.1);
		cursor: pointer;

		&:after {
			content: '';
			position: absolute;
			pointer-events: none;
			inset-block-start: 50%;
			inset-inline-end: 0.625rem;
			width: 0.75rem;
			height: 0.625rem;
			background-color: #000000;
			clip-path: polygon(8% 17%, 0% 25%, 50% 84%, 100% 25%, 92% 17%, 50% 65%);
			transform: translate(0, -50%)
				${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
		}
	`,
};

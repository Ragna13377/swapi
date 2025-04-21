import { styled } from 'styled-components';

export const StyledModal = {
	Overlay: styled.div`
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		opacity: 0;
		transition: opacity 0.2s ease;
		&[data-enter] {
			opacity: 1;
		}
	`,
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		background: transparent;
		inline-size: clamp(18rem, 80%, 60rem);
		block-size: clamp(15rem, 50%, 35rem);
		max-block-size: 90vh;
		min-block-size: fit-content;
	`,
	Header: styled.div`
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		inline-size: 100%;
		block-size: 3.25rem;
	`,
	CloseButton: styled.button`
		position: absolute;
		inset-inline-end: 0.75rem;
		inset-block-start: 50%;
		translate: -50% -50%;
		background: none;
		border: none;
		cursor: pointer;

		&::before,
		&::after {
			content: '';
			position: absolute;
			inline-size: 2.25rem;
			block-size: 0.5rem;
			background: hsla(0, 0%, 13%, 1);
			border-radius: 0.25rem;
			inset-inline-start: 50%;
			inset-block-start: 50%;
			transform-origin: center;
		}

		&::before {
			transform: translate(-50%, -50%) rotate(45deg);
		}

		&::after {
			transform: translate(-50%, -50%) rotate(-45deg);
		}
	`,
	Content: styled.div`
		flex-grow: 1;
		border-radius: 1rem;
		overflow: hidden;
	`,
};

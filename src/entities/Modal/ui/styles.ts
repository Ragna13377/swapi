import { styled } from 'styled-components';

export const StyledOverlay = styled.div`
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
`;
export const StyledModal = styled.div`
	background: white;
	border-radius: 8px;
	padding: 24px;
	max-width: 90%;
	max-height: 90vh;
	overflow-y: auto;
`;
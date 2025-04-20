import { keyframes, styled } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
	position: fixed;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
`;

const Spinner = styled.div`
	inline-size: 3.125rem;
	block-size: 3.125rem;
	border: 0.3125rem solid #f3f3f3;
	border-top: 0.3125rem solid #3498db;
	border-radius: 50%;
	animation: ${spin} 1s linear infinite;
`;

export const LoaderIndicator = () => (
	<LoaderContainer>
		<Spinner />
	</LoaderContainer>
);

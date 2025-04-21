import { keyframes, styled } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
	inline-size: 3.125rem;
	block-size: 3.125rem;
	border: 0.3125rem solid #f3f3f3;
	border-top: 0.3125rem solid #3498db;
	border-radius: 50%;
	animation: ${spin} 1s linear infinite;
`;

export const Spinner = () => <StyledSpinner />;

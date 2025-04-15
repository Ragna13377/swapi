import { styled } from 'styled-components';
import { RootLayoutUIProps } from '@entities/RootLayout/types';

export const StyledMain = styled.main<RootLayoutUIProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	block-size: 100%;
	inline-size: 100%;
	background: ${({ $background }) => $background};
	overflow: hidden;
	padding-block-start: 5.75rem;
	@meida (max-width: 720px) {
		padding-block-start: 10.75rem;
	}
`;

export const StyledWrapper = styled.div`
	max-inline-size: 1440px;
	inline-size: 100%;
	height: 100%;
	padding: 0 clamp(1rem, 5vw + 1rem, 9.875rem) 0;
`;
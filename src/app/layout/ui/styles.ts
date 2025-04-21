import { styled } from 'styled-components';
import { RootLayoutUIProps } from '@/app/layout/types';
import { theme } from '@shared/themes';

export const StyledLayout = {
	Main: styled.main<Pick<RootLayoutUIProps, '$background'>>`
		display: flex;
		align-items: center;
		justify-content: center;
		block-size: 100%;
		inline-size: 100%;
		background: ${({ $background }) => $background};
		overflow: hidden;
		padding-block-start: ${theme.spaces.headerMin};
		@media ${theme.breakPoints.headerBreakpoint} {
			padding-block-start: ${theme.spaces.headerMax};
		}
	`,
	Wrapper: styled.div`
		max-inline-size: 1440px;
		inline-size: 100%;
		height: 100%;
		padding: 0 clamp(1rem, 5vw + 1rem, 9.875rem) 0;
	`,
};

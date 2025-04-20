import { styled } from 'styled-components';
import { NavLink } from 'react-router';
import { theme } from '@shared/themes';
import { ReactComponent as Logo } from './assets/images/Logo.svg';

export const StyledHeader = {
	Wrapper: styled.header`
		inline-size: 100%;
		block-size: ${theme.spaces.headerMin};
		position: fixed;
		inset-block-start: 0;
		inset-inline-start: 0;
		z-index: 100;
		background: ${theme.colors.sidebarBackground};
		box-shadow: 0 4px 4px 0 hsla(0, 0%, 100%, 0.25);
		@media ${theme.breakPoints.headerBreakpoint} {
			block-size: ${theme.spaces.headerMax};
		}
	`,
	Container: styled.div`
		max-inline-size: 1440px;
		block-size: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.625rem clamp(1rem, 5vw + 1rem, 9.875rem) 0;
		margin: auto;
		@media (max-width: 720px) {
			flex-direction: column;
			padding: 1.4375rem clamp(1rem, 5vw + 1rem, 9.875rem);
		}
	`,
	LinkList: styled.ul`
		display: flex;
		gap: 4.625rem;
	`,
	Link: styled(NavLink)`
		font-size: 25px;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0;
		color: hsla(220, 20%, 97%, 1);
		transition: color 0.15s ease-in-out;
		&:not(.active):hover {
			color: hsla(76, 36%, 77%, 1);
		}

		&.active {
			position: relative;
			&:after {
				content: '';
				height: 3px;
				width: 80%;
				border: 3px solid hsla(76, 36%, 77%, 1);
				position: absolute;
				bottom: -15px;
				left: 50%;
				translate: -50% -50%;
			}
		}
	`,
	Logo: styled(Logo)`
		inline-size: 9.375rem;
		block-size: 5.625rem;
	`,
};

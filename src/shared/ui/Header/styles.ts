import { styled } from 'styled-components';
import { NavLink } from 'react-router';
import { ReactComponent as Logo } from './assets/images/Logo.svg';

export const StyledHeader = styled.header`
	inline-size: 100%;
	block-size: 5.75rem;
	position: fixed;
	inset-block-start: 0;
	inset-inline-start: 0;
	z-index: 100;
	background: hsla(230, 52%, 25%, 1);
	box-shadow: 0px 4px 4px 0px hsla(0, 0%, 100%, 0.25);
	@media (max-width: 720px) {
		block-size: 10.75rem;
	}
`;

export const StyledHeaderWrapper = styled.div`
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
`;

export const StyledHeaderLinkList = styled.ul`
	display: flex;
	gap: 4.625rem;
`;

export const StyledHeaderLink = styled(NavLink)`
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
`;

export const StyledHeaderLogo = styled(Logo)`
	inline-size: 9.375rem;
	block-size: 5.625rem;
`;

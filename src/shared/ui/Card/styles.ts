import { styled } from 'styled-components';

export const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	inline-size: 22rem;
	padding: 0.3125rem 0 12px 1.5625rem;
	border-radius: 0.5rem;
	background: hsla(0, 0%, 94%, 1);
	box-shadow: 0.25rem 0.25rem 0.25rem 0px hsla(0, 0%, 13%, 0.1);
`;

export const StyledCardTitle = styled.h3`
	font-weight: 700;
	font-size: clamp(1.125rem, 2vw + 0.5rem, 1.5rem);
	line-height: 1;
	letter-spacing: 0;
	color: hsla(0, 0%, 13%, 1);
`;

export const StyledCardMetrics = styled.div`
	display: flex;
	gap: 0.625rem;
`;

export const StyledCardCheeps = styled.div`
	display: flex;
	gap: 1rem;
`;

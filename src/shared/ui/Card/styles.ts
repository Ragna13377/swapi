import { styled } from 'styled-components';
import { theme } from '@shared/themes';

export const StyledCard = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		inline-size: 22rem;
		min-inline-size: 10.25rem;
		padding: 0.3125rem 0 12px 1.5625rem;
		border-radius: 0.5rem;
		background: ${theme.colors.cardBackground};
		box-shadow: 0.25rem 0.25rem 0.25rem 0 hsla(0, 0%, 13%, 0.1);
		cursor: pointer;
	`,
	Title: styled.h3`
		font-weight: 700;
		font-size: clamp(1.125rem, 2vw + 0.5rem, 1.5rem);
		line-height: 1;
		letter-spacing: 0;
		color: hsla(0, 0%, 13%, 1);
	`,
	MetricContainer: styled.div`
		display: flex;
		gap: 0.625rem;
	`,
	BadgeContainer: styled.div`
		display: flex;
		gap: 1rem;
	`,
};

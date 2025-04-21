import { styled } from 'styled-components';
import { theme } from '@shared/themes';

export const StyledCharacters = {
	ContentWrapper: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding-block: 4.75rem;
		block-size: 100%;
		@media ${theme.breakPoints.headerBreakpoint} {
			padding-block: clamp(2rem, 5vw, 4.75rem);
		}
	`,
	CardContainer: styled.div`
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
		gap: 2.75rem 2rem;
		overflow-y: scroll;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	`,
	Title: styled.h2`
		font-weight: 400;
		font-size: 35px;
		line-height: 1;
		letter-spacing: 3px;
		text-align: center;
		color: ${theme.colors.fontColorBlack};
		text-shadow:
			-1px -1px 0 hsla(0, 0%, 0%, 1),
			0 4px 4px hsla(0, 0%, 0%, 0.25);
		span {
			font-weight: 700;
		}
	`,
	FilterContainer: styled.div`
		display: flex;
		flex-wrap: wrap;
		inline-size: 100%;
		gap: 0.625rem;
		@media (max-width: 425px) {
			justify-content: center;
		}
	`,
	Loader: styled.div`
		display: flex;
		justify-content: center;
		padding: 2rem;
		grid-column: 1 / -1;
	`,
};

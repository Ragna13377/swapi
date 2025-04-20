import { styled } from 'styled-components';
import { ReactComponent as Banner } from './assets/images/banner.svg';

export const StyledHome = {
	Section: styled.section`
		inline-size: 100%;
		block-size: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		position: relative;
		padding-block-start: 8rem;
	`,
	ContentWrapper: styled.div`
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: clamp(2rem, 5vw, 4rem);
		max-inline-size: 34.875rem;
		@media (max-width: 1440px) {
			z-index: 10;
		}
	`,
	Title: styled.h1`
		font-size: clamp(2.5rem, 10vw, 4.5rem);
		font-weight: 700;
		line-height: 1;
		letter-spacing: 4px;
		color: hsla(0, 0%, 100%, 1);
		span {
			font-weight: 400;
		}
	`,
	Description: styled.h2`
		font-size: clamp(1.25rem, 5vw, 2rem);
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0;
		color: hsla(0, 0%, 100%, 1);
		white-space: normal;
		word-wrap: break-word;
		span {
			display: block;
		}
	`,
	Banner: styled(Banner)`
		inline-size: 50rem;
		block-size: 50rem;
		transition: filter 0.5s ease-in-out;
		position: absolute;
		inset-inline-start: 80%;
		inset-block-start: 0;
		translate: -50% 0;
		z-index: 0;
		@media (max-width: 1440px) {
			filter: brightness(0.5);
		}
	`,
};

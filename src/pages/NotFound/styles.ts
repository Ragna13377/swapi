import { styled } from 'styled-components';
import { ReactComponent as DeathStar } from './assets/images/death-star.svg';
import { theme } from '@shared/themes';

export const StyledNotFound = {
	Wrapper: styled.main`
		background-color: ${theme.colors.errorBackground};
		width: 100%;
		height: 100%;
		padding: clamp(16px, 9.4vh, 96px) clamp(16px, 5.7vw, 82px);
	`,
	ContentWrapper: styled.section`
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: clamp(24px, 5vh, 95px);
	`,
	IllustrationContainer: styled.div`
		position: relative;
		pointer-events: none;
		font-size: clamp(80px, 40vw, 450px);
		font-weight: 700;
		letter-spacing: 4px;
		line-height: 1;
		vertical-align: middle;
		color: hsla(0, 0%, 100%, 0.5);
	`,
	Illustration: styled(DeathStar)`
		position: absolute;
		inline-size: 1em;
		block-size: 1em;
		inset-inline-start: 50%;
		inset-block-start: 50%;
		transform: translate(-50%, -50%);
	`,
};

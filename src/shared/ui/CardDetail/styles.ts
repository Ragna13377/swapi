import { styled } from 'styled-components';
import { theme } from '@shared/themes';

const StyledSection = styled.div`
	block-size: 100%;
	padding: 2rem 0.75rem;
	display: flex;
	flex-direction: column;
`;

export const StyledDetails = {
	Wrapper: styled.div`
		inline-size: 100%;
		block-size: 100%;
		display: flex;
		background: ${theme.colors.accentBackground};
	`,
	SectionLeft: styled(StyledSection)`
		inline-size: 45%;
		justify-content: space-between;
		background: ${theme.colors.sidebarBackground};
	`,
	SectionRight: styled(StyledSection)`
		inline-size: 55%;
	`,
	BadgeContainer: styled.div`
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.75rem;
	`,
	IconWrapper: styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
	`,
	Title: styled.h2`
		color: ${theme.colors.fontColorWhite};
		font-weight: 700;
		font-size: 2.25rem;
		line-height: 1;
		letter-spacing: 0;
		margin-block-end: 1.75rem;
	`,
	ContentBlock: styled.div`
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		flex-grow: 1;
	`,
	DescriptionBlock: styled.div`
		min-inline-size: 15.625rem;
		min-block-size: 6.25rem;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-direction: column;
		padding: 1rem 1.25rem;
		border-radius: 8px;
		background: ${theme.colors.containerBackground};
		box-shadow: 0.25rem 0.25rem 0.25rem 0 hsla(0, 0%, 13%, 0.1);
		text-align: start;
		font-weight: 400;
		font-size: 1rem;
		line-height: 1;
		letter-spacing: 0;
	`,
	MetricsContainer: styled.div`
		display: flex;
		gap: 1.5rem;
	`,
	MetricWrapper: styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		min-inline-size: 5rem;
		min-block-size: 5rem;
		border-radius: 0.5rem;
		background: ${theme.colors.containerBackground};
		box-shadow: 0.25rem 0.25rem 1.5rem 0 hsla(214, 95%, 8%, 0.2);
	`,
};

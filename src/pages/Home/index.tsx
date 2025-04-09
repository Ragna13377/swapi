import { LinkButton } from '@shared/ui/LinkButton';
import { PageWrapper } from '@shared/ui/PageWrapper';
import {
	StyledBanner,
	StyledDescription,
	StyledTitle,
	StyledContentWrapper,
	StyledSectionWrapper,
} from './styles';

export const Home = () => (
	<PageWrapper $background='linear-gradient(180deg, #1F2A63 0%, #17002F 100%)'>
		<StyledSectionWrapper>
			<StyledContentWrapper>
				<StyledTitle>
					Find <span>all your favorite</span> character
				</StyledTitle>
				<StyledDescription>
					You can find out all the
					<span /> information about your favorite characters
				</StyledDescription>
				<LinkButton to='/characters'>See more...</LinkButton>
			</StyledContentWrapper>
			<StyledBanner />
		</StyledSectionWrapper>
	</PageWrapper>
);

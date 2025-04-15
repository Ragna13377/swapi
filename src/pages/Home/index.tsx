import { LinkButton } from '@shared/ui/LinkButton';
import {
	StyledBanner,
	StyledDescription,
	StyledTitle,
	StyledContentWrapper,
	StyledSectionWrapper,
} from './styles';

export const Home = () => (
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
);

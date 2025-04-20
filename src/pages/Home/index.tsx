import { LinkButton } from '@shared/ui/LinkButton';
import { StyledHome } from './styles';

export const Home = () => (
	<StyledHome.Section>
		<StyledHome.ContentWrapper>
			<StyledHome.Title>
				Find <span>all your favorite</span> character
			</StyledHome.Title>
			<StyledHome.Description>
				You can find out all the
				<span /> information about your favorite characters
			</StyledHome.Description>
			<LinkButton to='/characters'>See more...</LinkButton>
		</StyledHome.ContentWrapper>
		<StyledHome.Banner />
	</StyledHome.Section>
);

import { LinkButton } from '@shared/ui/LinkButton';
import {
	StyledPageContainer,
	StyledContentWrapper,
	StyledIllustrationWrapper,
	StyledIllustration,
} from './styles';

export const NotFound = () => (
	<StyledPageContainer>
		<StyledContentWrapper>
			<StyledIllustrationWrapper>
				<p>404</p>
				<StyledIllustration viewBox='0 0 690 623' />
			</StyledIllustrationWrapper>
			<LinkButton variant='secondary' to='..'>
				Return
			</LinkButton>
		</StyledContentWrapper>
	</StyledPageContainer>
);

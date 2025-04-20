import { LinkButton } from '@shared/ui/LinkButton';
import { StyledNotFound } from './styles';

export const NotFound = () => (
	<StyledNotFound.Wrapper>
		<StyledNotFound.ContentWrapper>
			<StyledNotFound.IllustrationContainer>
				<p>404</p>
				<StyledNotFound.Illustration viewBox='0 0 690 623' />
			</StyledNotFound.IllustrationContainer>
			<LinkButton variant='secondary' to='..'>
				Return
			</LinkButton>
		</StyledNotFound.ContentWrapper>
	</StyledNotFound.Wrapper>
);

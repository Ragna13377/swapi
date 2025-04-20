import { toCapitalizeFirstLetter } from '@shared/utils/stringUtils';
import { headerLinks } from './constants';
import { StyledHeader } from './styles';

export const Header = () => (
	<StyledHeader.Wrapper>
		<StyledHeader.Container>
			<StyledHeader.Logo />
			<nav>
				<StyledHeader.LinkList>
					{headerLinks.map(({ title, path }) => (
						<li key={title}>
							<StyledHeader.Link
								className={({ isActive }) => (isActive ? 'active' : '')}
								to={path ?? `/${title}`}
							>
								{toCapitalizeFirstLetter(title)}
							</StyledHeader.Link>
						</li>
					))}
				</StyledHeader.LinkList>
			</nav>
		</StyledHeader.Container>
	</StyledHeader.Wrapper>
);

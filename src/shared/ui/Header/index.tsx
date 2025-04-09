import { toCapitalizeFirstLetter } from '@shared/utils/stringUtils';
import { headerLinks } from './constants';
import {
	StyledHeader,
	StyledHeaderLink,
	StyledHeaderLinkList,
	StyledHeaderLogo,
	StyledHeaderWrapper,
} from './styles';

export const Header = () => (
	<StyledHeader>
		<StyledHeaderWrapper>
			<StyledHeaderLogo />
			<nav>
				<StyledHeaderLinkList>
					{headerLinks.map(({ title, path }) => (
						<li key={title}>
							<StyledHeaderLink
								className={({ isActive }) => (isActive ? 'active' : '')}
								to={path ?? `/${title}`}
							>
								{toCapitalizeFirstLetter(title)}
							</StyledHeaderLink>
						</li>
					))}
				</StyledHeaderLinkList>
			</nav>
		</StyledHeaderWrapper>
	</StyledHeader>
);

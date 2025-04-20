import { CHEAP_COLOR_MAP } from '@shared/ui/Card/constants';
import { isGender, TNormalizedCharacter } from '@shared/types';
import { Badge } from '@shared/ui/Badge';
import { MetricCircle } from '@shared/ui/MetricCircle';
import { StyledCard } from '@shared/ui/Card/styles';

export const Card = ({
	name,
	height,
	mass,
	birthYear,
	gender,
	onClick,
}: TNormalizedCharacter & { onClick?: () => void }) => (
	<StyledCard.Wrapper onClick={onClick}>
		<StyledCard.Title>{name}</StyledCard.Title>
		<StyledCard.MetricContainer>
			{height && <MetricCircle value={+height} description='height' />}
			{mass && <MetricCircle value={+mass} description='mass' />}
		</StyledCard.MetricContainer>
		<StyledCard.BadgeContainer>
			{gender && isGender(gender) && (
				<Badge $color={CHEAP_COLOR_MAP.gender[gender]} value={gender} />
			)}
			{birthYear && <Badge $color={CHEAP_COLOR_MAP.age} value={birthYear} />}
		</StyledCard.BadgeContainer>
	</StyledCard.Wrapper>
);

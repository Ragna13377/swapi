import { CHEAP_COLOR_MAP } from '@shared/ui/Card/constants';
import { isGender, TNormalizedCharacter } from '@shared/types';
import { Cheep } from '@shared/ui/Cheep';
import { MetricCircle } from '@shared/ui/MetricCircle';
import {
	StyledCard,
	StyledCardCheeps,
	StyledCardMetrics,
	StyledCardTitle,
} from './styles';

export const Card = ({
	name,
	height,
	mass,
	birthYear,
	gender,
	onClick,
}: TNormalizedCharacter & { onClick?: () => void }) => (
	<StyledCard onClick={onClick}>
		<StyledCardTitle>{name}</StyledCardTitle>
		<StyledCardMetrics>
			{height && <MetricCircle value={+height} description='height' />}
			{mass && <MetricCircle value={+mass} description='mass' />}
		</StyledCardMetrics>
		<StyledCardCheeps>
			{gender && isGender(gender) && (
				<Cheep $color={CHEAP_COLOR_MAP.gender[gender]} value={gender} />
			)}
			{birthYear && <Cheep $color={CHEAP_COLOR_MAP.age} value={birthYear} />}
		</StyledCardCheeps>
	</StyledCard>
);

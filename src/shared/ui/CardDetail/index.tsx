import { GenderEnum, isGender, TNormalizedCharacter } from '@shared/types';
import { CHEAP_COLOR_MAP } from '@shared/ui/Card/constants';
import { Badge } from '@shared/ui/Badge';
import { MetricCircle } from '@shared/ui/MetricCircle';
import { StyledDetails } from './styles';
import maleIcon from './assets/images/icon_male.svg';
import femaleIcon from './assets/images/icon_female.svg';
import hermaphroditeIcon from './assets/images/icon_hermaphrodite.svg';

export const CardDetail = ({
	name,
	mass,
	height,
	gender,
	birthYear,
	eyeColor,
	skinColor,
	hairColor,
}: TNormalizedCharacter) => (
	<StyledDetails.Wrapper>
		<StyledDetails.SectionLeft>
			<StyledDetails.IconWrapper>
				<img
					src={
						gender === GenderEnum.male
							? maleIcon
							: gender === GenderEnum.female
								? femaleIcon
								: hermaphroditeIcon
					}
					alt='Gender Icon'
				/>
			</StyledDetails.IconWrapper>
			<StyledDetails.BadgeContainer>
				{gender && isGender(gender) && (
					<Badge $color={CHEAP_COLOR_MAP.gender[gender]} value={gender} />
				)}
				{birthYear && <Badge $color={CHEAP_COLOR_MAP.age} value={birthYear} />}
			</StyledDetails.BadgeContainer>
		</StyledDetails.SectionLeft>
		<StyledDetails.SectionRight>
			<StyledDetails.Title>{name}</StyledDetails.Title>
			<StyledDetails.ContentBlock>
				<StyledDetails.DescriptionBlock>
					{hairColor && <p>Hair Color: {hairColor}</p>}
					{eyeColor && <p>Eye Color: {eyeColor}</p>}
					{skinColor && <p>Skin Color: {skinColor}</p>}
				</StyledDetails.DescriptionBlock>
				<StyledDetails.MetricsContainer>
					{height && (
						<StyledDetails.MetricWrapper>
							<MetricCircle value={+height} description='height' />
						</StyledDetails.MetricWrapper>
					)}
					{mass && (
						<StyledDetails.MetricWrapper>
							<MetricCircle value={+mass} description='mass' />
						</StyledDetails.MetricWrapper>
					)}
				</StyledDetails.MetricsContainer>
			</StyledDetails.ContentBlock>
		</StyledDetails.SectionRight>
	</StyledDetails.Wrapper>
);

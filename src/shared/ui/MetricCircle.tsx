import { styled } from 'styled-components';

type MetricCircleProps = {
	value: number;
	description: string;
};

const StyledWrapper = styled.div`
	inline-size: min-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.3125rem;
`;

const StyledValue = styled.div`
	inline-size: clamp(2.5rem, 2.5vw, 4rem);
	aspect-ratio: 1/1;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.1875rem solid hsla(0, 0%, 13%, 1);
	border-radius: 50%;
	font-weight: 400;
	font-size: clamp(0.75rem, 1vw, 1.25rem);
	line-height: 1;
	letter-spacing: 0;
	color: hsla(0, 0%, 13%, 1);
`;

const StyledDescription = styled.p`
	font-weight: 400;
	font-size: clamp(0.75rem, 1vw, 1rem);
	line-height: 1;
	letter-spacing: 0;
	text-align: center;
	color: hsla(0, 0%, 30%, 1);
`;

export const MetricCircle = ({ value, description }: MetricCircleProps) => (
	<StyledWrapper>
		<StyledValue>{value}</StyledValue>
		<StyledDescription>{description}</StyledDescription>
	</StyledWrapper>
);

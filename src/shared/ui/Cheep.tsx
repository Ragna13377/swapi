import { styled } from 'styled-components';

type CheepProps = {
	value: string;
	$color: string;
};

const StyledCheap = styled.div<Pick<CheepProps, '$color'>>`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ $color }) => $color};
	min-inline-size: clamp(4rem, 8vw + 2rem, 6rem);
	block-size: clamp(1rem, 1vw, 2rem);
	padding-block: clamp(0.5rem, 0.5vw, 1rem);
	border-radius: 0.75rem;
	box-shadow: 0px -0.125rem 0px 0px hsla(0, 0%, 0%, 0.18) inset;
	font-size: clamp(0.75rem, 1.5vw + 0.5rem, 1rem);
	font-weight: 400;
	line-height: 1;
	letter-spacing: 0;
	color: hsla(0, 0%, 13%, 1);
`;

export const Cheep = ({ value, $color }: CheepProps) => (
	<StyledCheap $color={$color}>{value}</StyledCheap>
);

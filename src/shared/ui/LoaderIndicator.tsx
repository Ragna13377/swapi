import { styled } from 'styled-components';
import { Spinner } from '@shared/ui/Spinner';

const LoaderContainer = styled.div`
	position: fixed;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
`;

export const LoaderIndicator = () => (
	<LoaderContainer>
		<Spinner />
	</LoaderContainer>
);

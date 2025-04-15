import { RootLayoutUIProps } from '../types';
import { Header } from '@shared/ui/Header';
import { Outlet } from 'react-router-dom';
import { StyledMain, StyledWrapper } from '@entities/RootLayout/ui/styles';

const RootLayoutUI = ({ $background }: RootLayoutUIProps) => (
	<>
		<Header />
		<StyledMain $background={$background}>
			<StyledWrapper>
				<Outlet />
			</StyledWrapper>
		</StyledMain>
	</>
);

export default RootLayoutUI;

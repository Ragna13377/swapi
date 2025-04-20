import { Outlet } from 'react-router-dom';
import { Header } from '@shared/ui/Header';
import { LoaderIndicator } from '@shared/ui/LoaderIndicator';
import { RootLayoutUIProps } from '../types';
import { StyledLayout } from './styles';

const RootLayoutUI = ({ isLoading, $background }: RootLayoutUIProps) => (
	<>
		{isLoading && <LoaderIndicator />}
		<Header />
		<StyledLayout.Main $background={$background}>
			<StyledLayout.Wrapper>
				<Outlet />
			</StyledLayout.Wrapper>
		</StyledLayout.Main>
	</>
);

export default RootLayoutUI;

import { useMatches, useNavigation } from 'react-router-dom';
import { RootLayoutProps } from '../types';
import RootLayoutUI from '../ui/RootLayoutUI';

export const RootLayout = () => {
	const navigation = useNavigation();
	const currentRoute = useMatches().at(-1);
	const $background =
		(currentRoute?.handle as RootLayoutProps)?.$background || 'white';
	return (
		<RootLayoutUI
			$background={$background}
			isLoading={navigation.state === 'loading'}
		/>
	);
};

import { useMatches } from 'react-router-dom';
import { RootLayoutProps } from '../types';
import RootLayoutUI from '../ui/RootLayoutUI';

export const RootLayout = () => {
	const currentRoute = useMatches().at(-1);
	const $background =
		(currentRoute?.handle as RootLayoutProps)?.$background || 'white';
	return <RootLayoutUI $background={$background} />;
};

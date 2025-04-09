import { createHashRouter } from 'react-router-dom';
import { Characters } from '@pages/Characters';
import { Home } from '@pages/Home';
import { NotFound } from '@pages/NotFound';

export const router = createHashRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/characters',
		element: <Characters />,
	},
	{
		path: '*',
		element: <NotFound />,
	}
]);

import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/app/layout';
import { Characters } from '@pages/Characters';
import { Home } from '@pages/Home';
import { NotFound } from '@pages/NotFound';
import { charactersLoader } from './loaders/charatersLoader';

export const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
				handle: {
					$background: 'linear-gradient(180deg, #1F2A63 0%, #17002F 100%)',
				},
			},
			{
				path: '/characters',
				element: <Characters />,
				loader: charactersLoader,
				errorElement: <NotFound />,
			},
			// {
			// 	path: '/characters/:id',
			// 	element: <CharacterDetails />,
			// 	loader: characterByIdLoader,
			// 	errorElement: <NotFound />,
			// },
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

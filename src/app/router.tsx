import { createBrowserRouter } from 'react-router-dom';
import { swapi } from '@shared/api/swapi';
import { Characters } from '@pages/Characters';
import { Home } from '@pages/Home';
import { NotFound } from '@pages/NotFound';
import { normalizeCharacters } from '@shared/api/swapi/utils';
import { defaultCharactersLoadPages } from '@shared/constants';
import { RootLayout } from '@entities/RootLayout';

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
				loader: async () => {
					const promises = Array.from(
						{ length: defaultCharactersLoadPages },
						(_, i) => swapi.getCharacters(i + 1)
					);
					const response = await Promise.all(promises);
					if (response.some((page) => !page)) {
						throw new Response('Not Found', { status: 404 });
					}
					const allResults = response.flatMap((page) =>
						page!.results.map(normalizeCharacters)
					);
					const lastPage = response.at(-1);
					return {
						results: allResults,
						count: lastPage!.count,
						next: lastPage!.next,
						prev: lastPage!.prev,
					};
				},
				errorElement: <NotFound />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

import { safeFetch } from '@shared/utils/fetchUtils';
import { swapiBaseUrl } from './constants';
import { characterWithPaginationSchema } from './schema';

export const swapi = {
	getCharacters: async (page = 1) =>
		await safeFetch({
			query: () =>
				fetch(`${swapiBaseUrl}/people/?page=${page}`).then((res) => res.json()),
			schema: characterWithPaginationSchema,
		}),
};

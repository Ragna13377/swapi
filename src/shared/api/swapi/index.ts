import { safeFetch } from '@shared/utils/fetchUtils';
import { swapiBaseUrl } from './constants';
import {
	CharacterWithPaginationResponse,
	characterWithPaginationSchema,
} from './schema';

export const swapi = {
	getCharacters: async (page = 1) =>
		await safeFetch<CharacterWithPaginationResponse>({
			query: () =>
				fetch(`${swapiBaseUrl}/people/?page=${page}`).then((res) => res.json()),
			schema: characterWithPaginationSchema,
		}),
};

import { safeFetch } from '@shared/utils/fetchUtils';
import { swapiBaseUrl } from './constants';
import {
	CharacterResponse, characterSchema,
	CharacterWithPaginationResponse,
	characterWithPaginationSchema,
} from './schema';

export const swapi = {
	getCharactersPagination: async (page = 1) =>
		await safeFetch<CharacterWithPaginationResponse>({
			query: () =>
				fetch(`${swapiBaseUrl}/people/?page=${page}`).then((res) => res.json()),
			schema: characterWithPaginationSchema,
		}),
	getCharacter: async (id: string) =>
		await safeFetch<CharacterResponse>({
			query: () =>
				fetch(`${swapiBaseUrl}/people/${id}`).then((res) => res.json()),
			schema: characterSchema,
		}),
};

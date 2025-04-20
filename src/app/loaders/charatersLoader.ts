import { defaultCharactersLoadPages } from '@shared/constants';
import { swapi } from '@shared/api/swapi';
import { normalizeCharacters } from '@shared/api/swapi/utils';

export const charactersLoader = async () => {
	const promises = Array.from({ length: defaultCharactersLoadPages }, (_, i) =>
		swapi.getCharactersPagination(i + 1)
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
};

export const characterByIdLoader = async ({
	params,
}: {
	params: { id: string };
}) => {
	if (!params.id) throw new Response('No match characters ID', { status: 400 });
	const character = await swapi.getCharacter(params.id);
	if (!character) throw new Response('Character not found', { status: 404 });
	return normalizeCharacters(character);
};

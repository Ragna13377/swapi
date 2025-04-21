import { defaultCharactersLoadPages } from '@shared/constants';
import { swapi } from '@shared/api/swapi';
import { normalizeCharacters } from '@shared/api/swapi/utils';

export const charactersLoader = async () => {
	const pages = await Promise.all(
		Array.from({ length: defaultCharactersLoadPages }, (_, i) =>
			swapi.getCharactersPagination(i + 1)
		)
	);

	if (pages.some((page) => !page)) {
		throw new Response('Not Found', { status: 404 });
	}

	const results = pages.flatMap((page) =>
		page!.results.map(normalizeCharacters)
	);

	const lastPage = pages.at(-1)!;
	return {
		results,
		count: lastPage.count,
		next: lastPage.next,
		prev: lastPage.prev,
	};
};

export const characterByIdLoader = async ({
	params,
}: {
	params: { id: string };
}) => {
	const id = params.id;
	if (!id) throw new Response('No match characters ID', { status: 400 });
	const character = await swapi.getCharacter(id);
	if (!character) throw new Response('Character not found', { status: 404 });
	return normalizeCharacters(character);
};

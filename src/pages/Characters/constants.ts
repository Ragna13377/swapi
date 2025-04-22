import { characterSchema } from '@shared/api/swapi/schema';
import { TFilterCategory } from '@pages/Characters/types';
import { snakeCaseToCamelCase } from '@shared/utils/stringUtils';
import { TNormalizedCharacter } from '@shared/types';

export const initialFilterState = {
	category: null,
	categoryOption: null,
};

export const ALL_CATEGORIES = Object.keys(characterSchema.shape)
	.reduce((acc, key) => {
		if (key !== 'url') {
			acc.push(snakeCaseToCamelCase(key) as keyof TNormalizedCharacter);
		}
		return acc;
	}, [] as TFilterCategory[]);
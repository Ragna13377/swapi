import { characterSchema } from '@shared/api/swapi/schema';
import { TFilterCategory } from '@pages/Characters/types';

export const initialFilterState = {
	category: null,
	categoryOption: null,
};

export const ALL_CATEGORIES = Object.keys(
	characterSchema.shape
) as TFilterCategory[];

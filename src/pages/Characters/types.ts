import { TNormalizedCharacter } from '@shared/types';
import { TSelectOption } from '@entities/Select/types';

export type TFilterCategory = keyof TNormalizedCharacter;
export type TFilterOptionsByCategory = Partial<
	Record<TFilterCategory, TSelectOption[]>
> & {
	all: TSelectOption[];
};
export type TActiveFilter = {
	category: TSelectOption | null;
	categoryOption: TSelectOption | null;
};
export type TFiltersMap = {
	categories: TSelectOption[];
	optionsByCategory: TFilterOptionsByCategory;
};

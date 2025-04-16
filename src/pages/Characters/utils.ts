import { TNormalizedCharacter } from '@shared/types';
import { snakeCaseToCapitalize } from '@shared/utils/stringUtils';
import { TSelectOption } from '@entities/Select/types';
import { ALL_OPTION, NONE_OPTION } from '@entities/Select/constants';
import {
	applySpecialOptions,
	createSelectOptions,
	sortOptions,
} from '@entities/Select/utils';
import { TFilterOptionsByCategory, TFiltersMap } from '@pages/Characters/types';
import { ALL_CATEGORIES } from './constants';

const getRangeFilter = (num: number, range = 50): string => {
	const rangeStart = Math.floor(num / range) * range;
	return `${rangeStart}-${rangeStart + range - 1}`;
};

export const generateFilters = (
	characters: TNormalizedCharacter[]
): TFiltersMap => {
	if (characters.length === 0)
		return {
			categories: [],
			optionsByCategory: {},
		};

	const categories = ALL_CATEGORIES;
	const categoryOptions = createSelectOptions(
		new Set(ALL_CATEGORIES),
		snakeCaseToCapitalize
	);

	const optionsByCategory: TFilterOptionsByCategory = {};

	for (const category of categories) {
		const isNameField = category === 'name';
		let hasNull = false;
		const uniqueValues = new Set<string>();

		for (const char of characters) {
			const option = char[category];
			if (!option) hasNull = true;
			else {
				const numOption = parseFloat(option);
				if (!isNaN(numOption)) uniqueValues.add(getRangeFilter(numOption));
				else {
					const values = isNameField
						? [option.charAt(0)]
						: option.split(',').map((s) => s.trim());
					values.forEach((v) => uniqueValues.add(v));
				}
			}
		}

		const sortedOptions = sortOptions(createSelectOptions(uniqueValues));
		optionsByCategory[category] = applySpecialOptions(sortedOptions, hasNull);
	}
	return {
		categories: categoryOptions,
		optionsByCategory,
	};
};

export const mergeFilters = (
	oldFilters: TFiltersMap,
	newCharacters: TNormalizedCharacter[]
): TFiltersMap => {
	if (newCharacters.length === 0)
		return oldFilters ?? { categories: [], optionsByCategory: {} };
	if (!oldFilters) return generateFilters(newCharacters);

	const newFilters = generateFilters(newCharacters);
	const mergedOptionsByCategory: TFilterOptionsByCategory = {};

	for (const category of ALL_CATEGORIES) {
		const oldOptions = oldFilters.optionsByCategory[category] ?? [];
		const newOptions = newFilters.optionsByCategory[category] ?? [];
		if (newOptions.length === 0) {
			mergedOptionsByCategory[category] = oldOptions;
			continue;
		}
		const allOptions = [...oldOptions, ...newOptions];

		const optionsMap = new Map<string, TSelectOption>();
		let hasNoneOption = false;
		for (const option of allOptions) {
			if (option.value === NONE_OPTION.value) {
				hasNoneOption = true;
			} else if (option.value !== ALL_OPTION.value) {
				optionsMap.set(option.value, option);
			}
		}

		const sortedOptions = sortOptions(Array.from(optionsMap.values()));
		mergedOptionsByCategory[category] = applySpecialOptions(
			sortedOptions,
			hasNoneOption
		);
	}

	return {
		categories: oldFilters.categories,
		optionsByCategory: mergedOptionsByCategory,
	};
};

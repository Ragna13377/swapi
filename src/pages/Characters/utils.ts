import { TNormalizedCharacter } from '@shared/types';
import {
	TFilterCategory,
	TFilterOptionsByCategory,
	TFiltersMap,
} from '@pages/Characters/types';
import { TSelectOption } from '@entities/Select/types';
import { camelCaseToCapitalize } from '@shared/utils/stringUtils';
import { ALL_OPTION, NONE_OPTION } from '@entities/Select/constants';

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
			optionsByCategory: {
				all: [],
			},
		};

	const firstCharacter = characters[0];
	const categories = Object.keys(firstCharacter) as TFilterCategory[];

	const categoryOptions: TSelectOption[] = [
		ALL_OPTION,
		...categories.map((category) => ({
			value: category,
			label: camelCaseToCapitalize(category),
		})),
	];

	const optionsByCategory: TFilterOptionsByCategory = {
		all: [ALL_OPTION],
	};
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
		const sortedUniqueValues = Array.from(uniqueValues)
			.sort((a, b) => {
				const numA = parseFloat(a);
				const numB = parseFloat(b);
				return !isNaN(numA) && !isNaN(numB) ? numA - numB : a.localeCompare(b);
			})
			.map((value) => ({
				value,
				label: camelCaseToCapitalize(value),
			}));
		optionsByCategory[category] = [
			ALL_OPTION,
			...sortedUniqueValues,
			...(hasNull ? [NONE_OPTION] : []),
		];
	}
	return {
		categories: categoryOptions,
		optionsByCategory,
	};
};

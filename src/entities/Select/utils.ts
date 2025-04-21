import { TSelectOption } from '@entities/Select/types';
import { camelCaseToCapitalize } from '@shared/utils/stringUtils';
import { ALL_OPTION, NONE_OPTION } from '@entities/Select/constants';

export const findOptionByKey = (
	options: TSelectOption[],
	key: string,
	startIndex = 0
) => {
	if (key.trim() === '') {
		return -1;
	}
	return options.findIndex(
		(option, index) =>
			index >= startIndex &&
			option.label.toLowerCase().startsWith(key.toLowerCase())
	);
};

export const createSelectOptions = (
	values: Set<string>,
	formatter: (str: string) => string = camelCaseToCapitalize
): TSelectOption[] =>
	Array.from(values).map((value) => ({
		value,
		label: formatter(value),
	}));

export const applySpecialOptions = (
	options: TSelectOption[],
	hasNoneOption: boolean
): TSelectOption[] => {
	const result: TSelectOption[] = [ALL_OPTION, ...options];
	if (hasNoneOption) result.push(NONE_OPTION);
	return result;
};

export const sortOptions = (options: TSelectOption[]): TSelectOption[] => [
	...options.sort((a, b) => {
		const numA = parseFloat(a.value);
		const numB = parseFloat(b.value);
		return !isNaN(numA) && !isNaN(numB)
			? numA - numB
			: a.value.localeCompare(b.value);
	}),
];

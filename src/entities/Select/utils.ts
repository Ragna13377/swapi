import { TSelectOption } from '@entities/Select/types';

export const isPrintableKey = (key: string) => /^[a-z0-9]$/i.test(key);

export const findOptionByKey = (
	options: TSelectOption[],
	key: string,
	startIndex = 0
) =>
	options.findIndex(
		(option, index) =>
			index >= startIndex &&
			option.label.toLowerCase().startsWith(key.toLowerCase())
	);

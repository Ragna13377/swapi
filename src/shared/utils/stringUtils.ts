export const toCapitalizeFirstLetter = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1);

export const camelCaseToCapitalize = (str: string) =>
	str
		.replace(/([A-Z])/g, ' $1')
		.replace(/\b\w/g, (char) => char.toUpperCase())
		.trim();

export const snakeCaseToCapitalize = (str: string) =>
	str
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

export const snakeCaseToCamelCase = (str: string): string => {
	if (!str.includes('_')) {
		return str;
	}

	return str
		.toLowerCase()
		.split('_')
		.filter(Boolean)
		.map((word, index) =>
			index === 0 ? word : toCapitalizeFirstLetter(word)
		)
		.join('');
};
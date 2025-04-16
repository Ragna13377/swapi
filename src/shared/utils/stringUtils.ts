export const toCapitalizeFirstLetter = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1);

export const camelCaseToCapitalize = (str: string) =>
	str.replace(/([A-Z])/g, ' $1').replace(/\b\w/g, (char) => char.toUpperCase());

export const snakeCaseToCapitalize = (str: string) =>
	str
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

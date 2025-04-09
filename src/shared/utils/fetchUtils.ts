import { ZodSchema } from 'zod';

type FetchProps<T> = {
	query: () => Promise<T>;
	schema: ZodSchema<T>;
};

export const safeFetch = async <T>({ query, schema }: FetchProps<T>) => {
	try {
		const result = await query();
		const parsedResult = schema.safeParse(result);
		if (!parsedResult.success) {
			console.log('Incorrect data: ', parsedResult.error);
			return null;
		}
		return parsedResult.data;
	} catch (error) {
		console.log(
			'Connection error: ',
			error instanceof Error ? error : new Error('Unknown error')
		);
		return null;
	}
};

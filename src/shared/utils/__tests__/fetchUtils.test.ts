import { z, ZodError } from 'zod';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { safeFetch } from '../fetchUtils';

const schema = z.object({
	id: z.number(),
	name: z.string(),
});
type SchemaResponse = z.infer<typeof schema>;

const mockSuccessData: SchemaResponse = { id: 1, name: 'Test' };
const mockInvalidData = { id: 'not-a-number', name: 123 };

describe('safeFetch', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(console, 'log').mockImplementation(() => {});
	});

	it('successful', async () => {
		const mockQuery = jest
			.fn<() => Promise<SchemaResponse>>()
			.mockResolvedValue(mockSuccessData);
		const result = await safeFetch({
			query: mockQuery,
			schema,
		});
		expect(result).toEqual(mockSuccessData);
		expect(mockQuery).toHaveBeenCalledTimes(1);
	});

	it('validation errors', async () => {
		const mockQuery = jest
			.fn<() => Promise<unknown>>()
			.mockResolvedValue(mockInvalidData);
		const result = await safeFetch({
			query: mockQuery,
			schema,
		});

		expect(result).toBeNull();
		expect(console.log).toHaveBeenCalledWith(
			'Incorrect data: ',
			expect.any(ZodError)
		);
	});

	it('connection errors', async () => {
		const mockError = new Error('Network error');
		const mockQuery = jest
			.fn<() => Promise<SchemaResponse>>()
			.mockRejectedValue(mockError);
		const result = await safeFetch({
			query: mockQuery,
			schema,
		});

		expect(result).toBeNull();
		expect(console.log).toHaveBeenCalledWith('Connection error: ', mockError);
	});

	it('unknown errors', async () => {
		const mockQuery = jest
			.fn<() => Promise<SchemaResponse>>()
			.mockRejectedValue('Unknown error');
		const result = await safeFetch({
			query: mockQuery,
			schema,
		});

		expect(result).toBeNull();
		expect(console.log).toHaveBeenCalledWith(
			'Connection error: ',
			expect.any(Error)
		);
	});
});

import { z } from 'zod';

export const characterSchema = z.object({
	name: z.string(),
	height: z.string(),
	mass: z.string(),
	birth_year: z.string(),
	eye_color: z.string(),
	hair_color: z.string(),
	skin_color: z.string(),
	gender: z.string(),
});

export const paginationSchema = z.object({
	count: z.number(),
	next: z.string().nullable().optional(),
	prev: z.string().nullable().optional(),
});

export const characterWithPaginationSchema = paginationSchema.extend({
	results: z.array(characterSchema),
});

export type CharacterResponse = z.infer<typeof characterSchema>;
export type PaginationResponse = z.infer<typeof paginationSchema>;
export type CharacterWithPaginationResponse = z.infer<
	typeof characterWithPaginationSchema
>;

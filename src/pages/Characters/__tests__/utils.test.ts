import { describe, expect, it } from '@jest/globals';
import { TNormalizedCharacter } from '@shared/types';
import { ALL_OPTION, NONE_OPTION } from '@entities/Select/constants';
import { TFilterCategory, TFiltersMap } from '../types';
import { generateFilters, mergeFilters } from '../utils';
import { ALL_CATEGORIES } from '../constants';

describe('filtersUtils', () => {
	const testCharacters: TNormalizedCharacter[] = [
		{
			id: '1',
			name: 'Luke Skywalker',
			height: '172',
			mass: null,
			gender: 'male',
			birthYear: '19BBY',
			eyeColor: 'blue, green',
			hairColor: 'blond',
			skinColor: 'fair',
		},
		{
			id: '2',
			name: 'Darth Vader',
			height: '202',
			mass: '36',
			gender: 'female',
			birthYear: '41.9BBY',
			eyeColor: 'yellow',
			hairColor: 'blond',
			skinColor: 'white',
		},
		{
			id: '3',
			name: 'Leia Organa',
			height: '150',
			mass: '49',
			gender: 'hermaphrodite',
			birthYear: '19BBY',
			eyeColor: 'red',
			hairColor: 'blond',
			skinColor: 'light',
		},
	];
	describe('generateFilters', () => {
		it('should handle empty array', () => {
			const result = generateFilters([]);
			expect(result).toEqual({
				categories: [],
				optionsByCategory: {},
			});
		});

		describe('should generate correct filters structure', () => {
			const result = generateFilters(testCharacters);
			const { categories, optionsByCategory } = result;

			it('for categories', () => {
				expect(categories).toHaveLength(ALL_CATEGORIES.length);
				expect(categories.map(c => c.value)).toEqual(ALL_CATEGORIES);
			});

			it('for all category options', () => {
				ALL_CATEGORIES.forEach(category => {
					expect(optionsByCategory[category]).toBeDefined();
					expect(optionsByCategory[category]).toContainEqual(ALL_OPTION);
				});
			});

			describe('for specific field types', () => {
				type TTestCase = {
					field: keyof TNormalizedCharacter;
					description: string;
					expected: string[];
				}
				const testCases: TTestCase[] = [
					{
						field: 'name',
						description: 'name field (first letter)',
						expected: ['L', 'D'],
					},
					{
						field: 'height',
						description: 'numeric range field',
						expected: ['150-199', '200-249'],
					},
					{
						field: 'mass',
						description: 'field with "none" value',
						expected: [NONE_OPTION.value, '0-49'],
					},
					{
						field: 'gender',
						description: 'enum field',
						expected: ['male', 'female', 'hermaphrodite'],
					},
					{
						field: 'eyeColor',
						description: 'multi-value field',
						expected: ['blue', 'green', 'yellow', 'red'],
					},
					{
						field: 'hairColor',
						description: 'same value field',
						expected: ['blond'],
					},
				];
				testCases.forEach(({ field, description, expected }) => {
					it(description, () => {
						expected.forEach(value => {
							expect(optionsByCategory[field]).toContainEqual(
								expect.objectContaining({ value })
							);
						});
					});
				});
			});
		});
	});
});

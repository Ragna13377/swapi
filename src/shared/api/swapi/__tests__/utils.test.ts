import { describe, expect, it } from '@jest/globals';
import { normalizeCharacters } from '@shared/api/swapi/utils';
import { mockCharactersResponse } from '@shared/mocks';

describe('normalizeCharacters', () => {
	it('should normalize character full data', () => {
		const result = normalizeCharacters(mockCharactersResponse);
		expect(result).toEqual({
			id: '1',
			name: 'Luke Skywalker',
			height: '172',
			mass: '77',
			gender: 'male',
			birthYear: '19BBY',
			eyeColor: 'blue',
			hairColor: 'blond',
			skinColor: 'fair',
		});
	});
	it('should normalize character with null and wrong values', () => {
		const result = normalizeCharacters({
			...mockCharactersResponse,
			url: '/invalid-url',
			height: '1,800',
			mass: 'n/a',
			gender: 'robot',
			birth_year: 'none',
			eye_color: 'unknown',
			hair_color: 'n/a',
			skin_color: 'unknown',
		});

		expect(result).toEqual({
			name: 'Luke Skywalker',
			id: '',
			height: '1800',
			mass: null,
			gender: null,
			birthYear: null,
			eyeColor: null,
			hairColor: null,
			skinColor: null,
		});
	});
});

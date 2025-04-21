import { describe, expect, it } from '@jest/globals';
import {
	camelCaseToCapitalize,
	snakeCaseToCapitalize,
	toCapitalizeFirstLetter,
} from '../stringUtils';

describe('String utils', () => {
	describe('toCapitalizeFirstLetter', () => {
		it.each([
			['hello', 'Hello'],
			['Hello', 'Hello'],
			['', ''],
			['1apple', '1apple'],
			['$hello', '$hello'],
		])('should transform "%s" to "%s"', (input, expected) => {
			expect(toCapitalizeFirstLetter(input)).toBe(expected);
		});
	});
	describe('camelCaseToCapitalize', () => {
		it.each([
			['camelCaseTest2', 'Camel Case Test2'],
			['CamelCase#Test', 'Camel Case# Test'],
			['', ''],
		])('should transform "%s" to "%s"', (input, expected) => {
			expect(camelCaseToCapitalize(input)).toBe(expected);
		});
	});
	describe('snakeCaseToCapitalize', () => {
		it.each([
			['snake_case_test', 'Snake Case Test'],
			['', ''],
		])('should transform "%s" to "%s"', (input, expected) => {
			expect(snakeCaseToCapitalize(input)).toBe(expected);
		});
	});
});

import { describe, expect, it } from '@jest/globals';
import { ALL_OPTION, NONE_OPTION } from '../constants';
import { TSelectOption } from '../types';
import { applySpecialOptions, createSelectOptions, findOptionByKey, sortOptions } from '../utils';

describe('Select utils', () => {
	const sampleOptions: TSelectOption[] = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'blueberry', label: 'Blueberry' },
	];

	describe('findOptionByKey', () => {
		it('should  find option by key (case insensitive)', () => {
			expect(findOptionByKey(sampleOptions, 'a')).toBe(0);
			expect(findOptionByKey(sampleOptions, 'B')).toBe(1);
		});
		it('should returns -1 if no match', () => {
			expect(findOptionByKey(sampleOptions, 'x')).toBe(-1);
			expect(findOptionByKey([], 'a')).toBe(-1);
			expect(findOptionByKey(sampleOptions, '')).toBe(-1);
		});
		it('should  start search from specified index', () => {
			expect(findOptionByKey(sampleOptions, 'b', 2)).toBe(3);
		});
	});
	describe('createSelectOptions', () => {
		it('should create options with default formatter', () => {
			const values = new Set(['testValue', 'anotherOption']);
			expect(createSelectOptions(values)).toEqual([
				{ value: 'testValue', label: 'Test Value' },
				{ value: 'anotherOption', label: 'Another Option' },
			]);
		});
		it('should create options with custom formatter', () => {
			const values = new Set(['test']);
			const customFormatter = (str: string) => `[${str}]`;
			expect(createSelectOptions(values, customFormatter)).toEqual([
				{ value: 'test', label: '[test]' },
			]);
		});
		it('should handle empty Set', () => {
			expect(createSelectOptions(new Set())).toEqual([]);
		});
	});
	describe('applySpecialOptions', () => {
		it('should add ALL_OPTION at beginning', () => {
			const result = applySpecialOptions(sampleOptions, false);
			expect(result[0]).toEqual(ALL_OPTION);
			expect(result).toHaveLength(sampleOptions.length + 1);
		});
		it('should add NONE_OPTION at end when hasNoneOption=true', () => {
			const result = applySpecialOptions(sampleOptions, true);
			expect(result[result.length - 1]).toEqual(NONE_OPTION);
			expect(result).toHaveLength(sampleOptions.length + 2);
		});
		it('should handle empty options array', () => {
			expect(applySpecialOptions([], false)).toEqual([ALL_OPTION]);
		});
	});
	describe('sortOptions', () => {
		it('should sort numeric values as numbers', () => {
			const numericOptions = [
				{ value: '10', label: '10' },
				{ value: '2', label: '2' },
			];
			expect(sortOptions(numericOptions)).toEqual([
				{ value: '2', label: '2' },
				{ value: '10', label: '10' },
			]);
		});
		it('should sort string values "localeCompare"', () => {
			const stringOptions = [
				{ value: 'banana', label: 'Banana' },
				{ value: 'apple', label: 'Apple' },
			];
			expect(sortOptions(stringOptions)).toEqual([
				{ value: 'apple', label: 'Apple' },
				{ value: 'banana', label: 'Banana' },
			]);
		});
		it('should handle mixed numeric and string values', () => {
			const mixedOptions = [
				{ value: '10', label: '10' },
				{ value: 'apple', label: 'Apple' },
				{ value: '2', label: '2' },
			];
			expect(sortOptions(mixedOptions)).toEqual([
				{ value: '2', label: '2' },
				{ value: '10', label: '10' },
				{ value: 'apple', label: 'Apple' },
			]);
		});
		it('should handle empty array', () => {
			expect(sortOptions([])).toEqual([]);
		});
	});
});

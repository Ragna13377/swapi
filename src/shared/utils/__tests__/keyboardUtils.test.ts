import { describe, expect, it } from '@jest/globals';
import { isPrintableKey } from '../keyboardUtils';

describe('isPrintableKey', () => {
	it.each(['a', 'A', '0'])(
		'should return true for printable key "%s"',
		(key) => {
			expect(isPrintableKey(key)).toBe(true);
		}
	);
	it.each(['!', '@', '#', ' ', '$', '^', '&', '*', '', '\n', '\t'])(
		'should return false for non-printable key "%s"',
		(key) => {
			expect(isPrintableKey(key)).toBe(false);
		}
	);
});

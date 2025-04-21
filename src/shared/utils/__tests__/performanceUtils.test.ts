import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	jest,
} from '@jest/globals';
import { debounce, throttle } from '../performanceUtils';

describe('debounce', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		jest.spyOn(global, 'clearTimeout');
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should call only once with the last value after delay', () => {
		const mockFn = jest.fn();
		const debouncedFn = debounce(mockFn, 100);

		debouncedFn('test1');
		debouncedFn('test2');
		debouncedFn('test3');

		jest.advanceTimersByTime(50);
		expect(mockFn).not.toHaveBeenCalled();

		jest.advanceTimersByTime(100);
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenLastCalledWith('test3');

		expect(clearTimeout).toHaveBeenCalledTimes(2);
	});
});

describe('throttle', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});
	it('should call once immediately, then once after delay', () => {
		const mockFn = jest.fn();
		const throttled = throttle(mockFn, 100);

		throttled('first');
		throttled('second');
		throttled('third');

		jest.advanceTimersByTime(50);
		expect(mockFn).not.toHaveBeenCalled();

		jest.advanceTimersByTime(60);
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenLastCalledWith('first');

		throttled('fourth');
		jest.advanceTimersByTime(100);
		expect(mockFn).toHaveBeenCalledTimes(2);
		expect(mockFn).toHaveBeenLastCalledWith('fourth');
	});
});

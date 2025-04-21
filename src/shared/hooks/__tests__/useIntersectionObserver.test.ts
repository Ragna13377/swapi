import {
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	jest,
} from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '@shared/hooks/useIntersectionObserver';
import { act } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

let mockObserve: jest.Mock;
let mockUnobserve: jest.Mock;
let mockDisconnect: jest.Mock;
let mockObserverInstance: IntersectionObserver;

beforeAll(() => {
	mockObserve = jest.fn();
	mockUnobserve = jest.fn();
	mockDisconnect = jest.fn();

	mockObserverInstance = {
		observe: mockObserve,
		unobserve: mockUnobserve,
		disconnect: mockDisconnect,
	} as unknown as IntersectionObserver;

	global.IntersectionObserver = jest.fn((callback, options) => {
		(global as any).__observerCallback__ = callback;
		return mockObserverInstance;
	}) as any;
});

describe('useIntersectionObserver', () => {
	const mockElement = document.createElement('div');
	const mockOnIntersect = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const setup = (isEnabled = true) =>
		renderHook(() =>
			useIntersectionObserver({
				element: mockElement,
				onIntersect: mockOnIntersect,
				isEnabled,
			})
		);

	it('should observer enabled when isEnabled is true', () => {
		setup(true);

		expect(IntersectionObserver).toHaveBeenCalledTimes(1);
		expect(mockObserve).toHaveBeenCalledWith(mockElement);
	});
	it('should observer disabled when isEnabled is false', () => {
		setup(false);

		expect(IntersectionObserver).not.toHaveBeenCalled();
		expect(mockObserve).not.toHaveBeenCalled();
	});

	it('should call onIntersect when entry is intersecting', () => {
		const { unmount } = setup(true);

		const mockEntry: IntersectionObserverEntry = {
			isIntersecting: true,
			target: mockElement,
			boundingClientRect: {} as DOMRectReadOnly,
			intersectionRatio: 1,
			intersectionRect: {} as DOMRectReadOnly,
			rootBounds: null,
			time: 0,
		};

		act(() => {
			(global as any).__observerCallback__([mockEntry], {
				unobserve: mockUnobserve,
			});
		});

		expect(mockOnIntersect).toHaveBeenCalledTimes(1);
		expect(mockUnobserve).toHaveBeenCalledWith(mockElement);

		unmount();
		expect(mockDisconnect).toHaveBeenCalledTimes(1);
	});
});

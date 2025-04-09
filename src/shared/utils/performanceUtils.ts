import { TTimeout } from '@shared/types';
export const debounce = <F extends (...args: Parameters<F>) => void>(
	fn: F,
	delay: number
): ((...args: Parameters<F>) => void) => {
	let timeout: TTimeout = null;
	return function (...args) {
		if (timeout !== null) clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), delay);
	};
};

export const throttle = <F extends (...args: Parameters<F>) => void>(
	fn: F,
	delay: number
): ((...args: Parameters<F>) => void) => {
	let timeout: TTimeout = null;

	return function perform(...args: Parameters<F>) {
		if (!timeout) {
			timeout = setTimeout(() => {
				fn(...args);
				timeout = null;
			}, delay);
		}
	};
};

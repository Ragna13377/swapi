import { RefObject, useEffect } from 'react';
import { focusableSelector } from '@entities/Modal/constants';

type UseFocusTrapProps = {
	isOpen: boolean;
	modalRef: RefObject<HTMLDivElement | null>;
};

export const useFocusTrap = ({ isOpen, modalRef }: UseFocusTrapProps) => {
	useEffect(() => {
		if (!isOpen || !modalRef.current) return;

		const focusableElements =
			modalRef.current.querySelectorAll<HTMLElement>(focusableSelector);
		const length = focusableElements.length;
		if (length === 0) return;

		const firstElement = focusableElements[0];
		const firstContentElement = focusableElements[1];
		const lastElement = focusableElements[length - 1];
		(firstContentElement ?? firstElement).focus();

		const handleTabKey = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			if (!e.shiftKey && document.activeElement === lastElement) {
				e.preventDefault();
				firstElement.focus();
			}
			if (e.shiftKey && document.activeElement === firstElement) {
				e.preventDefault();
				lastElement.focus();
			}
		};
		document.addEventListener('keydown', handleTabKey);
		return () => document.removeEventListener('keydown', handleTabKey);
	}, [isOpen]);
};

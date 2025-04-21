import { useEffect, useRef } from 'react';

type UseModalControlProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const useModalControl = ({ isOpen, onClose }: UseModalControlProps) => {
	const previouslyFocusedElement = useRef<HTMLElement>(null);
	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) onClose();
	};
	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			previouslyFocusedElement.current = document.activeElement as HTMLElement;
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			previouslyFocusedElement.current?.focus();
			document.body.style.overflow = '';
		};
	}, [isOpen, onClose]);
	return {
		handleOverlayClick,
	};
};

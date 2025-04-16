import { RefObject, useEffect, useRef } from 'react';

type UseModalControlProps = {
	isOpen: boolean;
	onClose: () => void;
	modalRef: RefObject<HTMLDivElement | null>;
};

export const useModalControl = ({
	isOpen,
	onClose,
	modalRef,
}: UseModalControlProps) => {
	const previouslyFocusedElement = useRef<HTMLElement>(null);
	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) onClose();
	};
	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		if (isOpen && modalRef.current) modalRef.current.focus();
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

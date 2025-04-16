import { ModalProps } from '../types';
import ModalUI from '../ui/ModalUI';
import { useRef } from 'react';
import { useFocusTrap } from '@entities/Modal/model/hooks/useFocusTrap';
import { useModalControl } from '@entities/Modal/model/hooks/useModalControl';

export const Modal = ({ isOpen, onClose, ...rest }: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const { handleOverlayClick } = useModalControl({
		isOpen,
		onClose,
		modalRef,
	});
	useFocusTrap({
		isOpen,
		modalRef,
	});

	if (!isOpen) return null;

	return (
		<ModalUI
			ref={modalRef}
			isOpen={isOpen}
			onOverlayClick={handleOverlayClick}
			{...rest}
		/>
	);
};

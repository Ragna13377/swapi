import { ModalUIProps } from '../types';
import { createPortal } from 'react-dom';
import { StyledModal, StyledOverlay } from '@entities/Modal/ui/styles';

const ModalUI = ({
	isOpen,
	onOverlayClick,
	ref,
	children,
	title,
}: ModalUIProps) =>
	createPortal(
		<StyledOverlay
			role='dialog'
			aria-modal='true'
			aria-labelledby={title ? 'modal-title' : undefined}
			tabIndex={-1}
			data-enter={isOpen ? true : undefined}
			onClick={onOverlayClick}
		>
			<StyledModal ref={ref} onClick={(e) => e.stopPropagation()}>
				{title && <h2 id='modal-title'>{title}</h2>}
				{children}
			</StyledModal>
		</StyledOverlay>,
		document.body
	);

export default ModalUI;

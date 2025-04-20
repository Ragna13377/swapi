import { ModalUIProps } from '../types';
import { createPortal } from 'react-dom';
import { StyledModal } from '@entities/Modal/ui/styles';

const ModalUI = ({
	isOpen,
	onOverlayClick,
	ref,
	children,
	title,
}: ModalUIProps) =>
	createPortal(
		<StyledModal.Overlay
			role='dialog'
			aria-modal='true'
			aria-labelledby={title ? 'modal-title' : undefined}
			tabIndex={-1}
			data-enter={isOpen ? true : undefined}
			onClick={onOverlayClick}
		>
			<StyledModal.Wrapper ref={ref} onClick={(e) => e.stopPropagation()}>
				<StyledModal.Header>
					{title && <h2 id='modal-title'>{title}</h2>}
					<StyledModal.CloseButton onClick={onOverlayClick} />
				</StyledModal.Header>
				<StyledModal.Content>{children}</StyledModal.Content>
			</StyledModal.Wrapper>
		</StyledModal.Overlay>,
		document.body
	);

export default ModalUI;

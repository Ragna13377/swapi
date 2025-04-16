import { PropsWithChildren, Ref } from 'react';

export type ModalProps = PropsWithChildren & {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
};

export type ModalUIProps = Omit<ModalProps, 'onClose'> & {
	ref: Ref<HTMLDivElement>;
	onOverlayClick: (e: React.MouseEvent) => void;
};

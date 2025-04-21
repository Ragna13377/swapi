import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	jest,
} from '@jest/globals';
import { render } from '@testing-library/react';
import { Modal } from '@entities/Modal';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
	const mockOnClose = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		document.body.style.overflow = '';
	});

	const setup = (props?: Partial<React.ComponentProps<typeof Modal>>) =>
		render(
			<Modal isOpen onClose={mockOnClose} title='Test Modal' {...props}>
				<p>Test Content</p>
			</Modal>
		);

	describe('Rendering', () => {
		it('should not render when isOpen is false', () => {
			const { queryByRole } = render(
				<Modal isOpen={false} onClose={mockOnClose} />
			);
			expect(queryByRole('dialog')).not.toBeInTheDocument();
		});
		it('should render with content and title when isOpen is true', () => {
			const { getByRole, getByText } = setup();
			expect(getByRole('dialog')).toBeInTheDocument();
			expect(getByRole('button')).toBeInTheDocument();
			expect(getByText('Test Modal')).toBeInTheDocument();
			expect(getByText('Test Content')).toBeInTheDocument();
		});
	});

	describe('Close behavior', () => {
		it('should close on overlay click', async () => {
			const { getByRole } = setup();
			await userEvent.click(getByRole('dialog'));
			expect(mockOnClose).toHaveBeenCalled();
		});
		it('should closes on Escape key', async () => {
			setup();
			await userEvent.keyboard('{Escape}');
			expect(mockOnClose).toHaveBeenCalledTimes(1);
		});
		it('should closes on close button click', async () => {
			const { getByRole } = setup();
			await userEvent.click(getByRole('button'));
			expect(mockOnClose).toHaveBeenCalledTimes(1);
		});
		it('should doesnt close when clicking inside content', async () => {
			const { getByText } = render(
				<Modal isOpen onClose={mockOnClose}>
					<button>Test Button</button>
				</Modal>
			);
			await userEvent.click(getByText('Test Button'));
			expect(mockOnClose).not.toHaveBeenCalled();
		});
	});

	describe('Focus management', () => {
		it('should trap focus inside modal', async () => {
			const { getByText, getByLabelText } = render(
				<Modal isOpen onClose={() => {}}>
					<button>First</button>
					<button>Second</button>
				</Modal>
			);

			const [first, second, closeButton] = [
				getByText('First'),
				getByText('Second'),
				getByLabelText('Close modal'),
			];

			expect(first).toHaveFocus();

			await userEvent.tab();
			expect(second).toHaveFocus();

			await userEvent.tab();
			expect(closeButton).toHaveFocus();

			await userEvent.tab({ shift: true });
			expect(second).toHaveFocus();
		});
		it('should handles with no focusable childrens', () => {
			const { getByLabelText, container } = render(
				<Modal isOpen onClose={() => {}}>
					<div>No focusable elements here</div>
				</Modal>
			);
			expect(container).toBeInTheDocument();
			expect(getByLabelText('Close modal')).toHaveFocus();
		});
		it('should restore focus to previously focused element', async () => {
			const button = document.createElement('button');
			button.textContent = 'Initial Focus';
			document.body.appendChild(button);
			button.focus();

			const { unmount } = render(<Modal isOpen onClose={mockOnClose} />);
			unmount();

			expect(button).toHaveFocus();
			document.body.removeChild(button);
		});
	});
	describe('Body scroll', () => {
		it('should disable body scroll when modal is open', () => {
			setup();
			expect(document.body.style.overflow).toBe('hidden');
		});
		it('Restores scroll when closed', () => {
			const { unmount } = setup();
			unmount();
			expect(document.body.style.overflow).toBe('');
		});
	});
});

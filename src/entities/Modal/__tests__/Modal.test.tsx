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

	it('Doesnt render when isOpen is false', () => {
		const { queryByRole } = render(
			<Modal isOpen={false} onClose={mockOnClose} />
		);
		expect(queryByRole('dialog')).not.toBeInTheDocument();
	});
	it('Correct render when isOpen is true', () => {
		const { getByRole, getByText } = render(
			<Modal isOpen onClose={mockOnClose} title='Test Modal'>
				<p>Test Content</p>
			</Modal>
		);
		expect(getByRole('dialog')).toBeInTheDocument();
		expect(getByRole('button')).toBeInTheDocument();
		expect(getByText('Test Modal')).toBeInTheDocument();
		expect(getByText('Test Content')).toBeInTheDocument();
	});
	it('Calls onClose on overlay click', async () => {
		const { getByRole } = render(
			<Modal isOpen onClose={mockOnClose}>
				<p>Test</p>
			</Modal>
		);
		const overlay = getByRole('dialog');
		await userEvent.click(overlay);
		expect(mockOnClose).toHaveBeenCalled();
	});
	it('Click inside doesnt close Modal', async () => {
		const { getByText } = render(
			<Modal isOpen onClose={mockOnClose}>
				<button>Test Button</button>
			</Modal>
		);
		const button = getByText('Test Button');
		await userEvent.click(button);
		expect(mockOnClose).not.toHaveBeenCalled();
	});
	it('calls onClose when Escape key is pressed', async () => {
		render(<Modal isOpen onClose={mockOnClose} />);
		await userEvent.keyboard('{Escape}');
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});
	it('calls onClose when CloseButton is clicked', async () => {
		const { getByRole } = render(<Modal isOpen onClose={mockOnClose} />);
		const closeButton = getByRole('button');
		await userEvent.click(closeButton);
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});
	it('focuses first focusable element inside the modal', async () => {
		const { getByText, getByLabelText } = render(
			<Modal isOpen onClose={() => {}}>
				<button>First</button>
				<button>Second</button>
			</Modal>
		);

		const firstButton = getByText('First');
		const secondButton = getByText('Second');
		const closeButton = getByLabelText('Close modal');

		expect(firstButton).toHaveFocus();

		await userEvent.tab();
		expect(secondButton).toHaveFocus();

		await userEvent.tab();
		expect(closeButton).toHaveFocus();

		await userEvent.tab({ shift: true });
		expect(secondButton).toHaveFocus();
	});

	it('disables body scroll when modal is open', () => {
		render(<Modal isOpen onClose={mockOnClose} />);
		expect(document.body.style.overflow).toBe('hidden');
	});

	it('restores body scroll when modal is closed', () => {
		const { unmount } = render(<Modal isOpen onClose={mockOnClose} />);
		unmount();
		expect(document.body.style.overflow).toBe('');
	});

	it('restores focus to previously focused element when closed', async () => {
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

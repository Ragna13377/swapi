import { render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import { Select } from '@entities/Select';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('useControlSelect', () => {
	const options = [
		{ value: 'a', label: 'Apple' },
		{ value: 'b', label: 'Banana' },
		{ value: 'c', label: 'Cherry' },
	];

	const mockOnChange = jest.fn();
	const mockSetIsOpen = jest.fn();

	const baseProps = {
		options,
		onChange: mockOnChange,
		activeValue: null,
		id: 'select-id'
	};

	const setup = (props?: Partial<React.ComponentProps<typeof Select>>) =>
		render(<Select {...baseProps} {...props} />);

	const createTestContext = async (props?: Partial<React.ComponentProps<typeof Select>>) => {
		const utils = setup(props);
		const user = userEvent.setup();
		const combobox = utils.getByRole('combobox');
		await user.click(combobox);
		return { ...utils, user, combobox };
	};

	const checkAriaExpanded = (combobox: HTMLElement, expectedValue: string) => {
		expect(combobox).toHaveAttribute('aria-expanded', expectedValue);
	};

	const checkActiveDescendant = async (user: any, combobox: HTMLElement, key: string, expectedId: string) => {
		await user.keyboard(key);
		expect(combobox).toHaveAttribute('aria-activedescendant', expectedId);
	};

	describe('keyboard actions', () => {
		it('should handle navigation', async () => {
			const { user, combobox } = await createTestContext();

			await checkActiveDescendant(user, combobox, '{ArrowDown}', 'select-id-option-0');
			await checkActiveDescendant(user, combobox, '{End}', 'select-id-option-2');
			await checkActiveDescendant(user, combobox, '{Home}', 'select-id-option-0');
			await checkActiveDescendant(user, combobox, '{ArrowUp}{ArrowUp}', 'select-id-option-1');

			await user.keyboard('{Enter}');
			expect(mockOnChange).toHaveBeenCalledWith(options[1]);
			expect(combobox).toHaveAttribute('aria-expanded', 'false');
		});
		it('should open/close menu', async () => {
			const { user, combobox } = await createTestContext();

			await user.keyboard(' ');
			checkAriaExpanded(combobox, 'true');

			await user.keyboard('{Escape}');
			checkAriaExpanded(combobox, 'false');

			await user.keyboard('{Enter}');
			checkAriaExpanded(combobox, 'true');

			await user.keyboard('{Tab}');
			checkAriaExpanded(combobox, 'false');
		});
		it('should handle printable keys', async () => {
			const { user, combobox } = await createTestContext();

			await checkActiveDescendant(user, combobox, 'B', 'select-id-option-1');
			await checkActiveDescendant(user, combobox, 'C', 'select-id-option-2');
		});
	});

	describe('mouse interactions', () => {
		it('should close the menu on outside click', async () => {
			const { user, combobox } = await createTestContext();
			checkAriaExpanded(combobox, 'true');

			await user.click(document.body);
			checkAriaExpanded(combobox, 'false');
		});
		it('should handle focus on the select', async () => {
			const { combobox } = await createTestContext();
			expect(combobox).toHaveFocus();
		});
		it('should handle mouse click on option', async () => {
			const { getByText, user, combobox } = await createTestContext();

			const option = options[1];
			const optionElement = getByText(option.label);

			await user.click(optionElement);
			expect(mockOnChange).toHaveBeenCalledWith(option);
			checkAriaExpanded(combobox, 'false');
		});
	});

	describe('edge cases', () => {
		it('should not open the menu if options list is empty', async () => {
			const { combobox } = await createTestContext({
				options: []
			});

			checkAriaExpanded(combobox, 'false');
			expect(mockSetIsOpen).not.toHaveBeenCalled();
		});
		it('should block interaction when only one option exists', async () => {
			const { user, combobox } = await createTestContext({
				options: [options[0]],
			});

			await user.keyboard('{ArrowDown}');
			expect(combobox).not.toHaveAttribute('aria-activedescendant');
		});
		it('should scroll to highlighted option', async () => {
			const { getByText, user, combobox } = await createTestContext();

			const option = options[1];
			const optionElement = getByText(option.label);

			await user.keyboard('{ArrowDown}');
			expect(optionElement.scrollIntoView).toHaveBeenCalled();
		});
	});
});

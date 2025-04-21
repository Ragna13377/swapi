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

	const setup = (props?: Partial<React.ComponentProps<typeof Select>>) =>
		render(
			<Select
				options={options}
				onChange={mockOnChange}
				activeValue={null}
				id='select-id'
				{...props}
			/>
		);

	describe('keyboard actions', () => {
		it('should handle navigation', async () => {
			const { getByRole } = setup();
			const combobox = getByRole('combobox');
			const user = userEvent.setup();

			await user.click(combobox);

			await user.keyboard('{ArrowDown}');
			expect(combobox).toHaveAttribute(
				'aria-activedescendant',
				'select-id-option-0'
			);

			await user.keyboard('{End}');
			expect(combobox).toHaveAttribute(
				'aria-activedescendant',
				'select-id-option-2'
			);

			await user.keyboard('{Home}');
			expect(combobox).toHaveAttribute(
				'aria-activedescendant',
				'select-id-option-0'
			);

			await user.keyboard('{ArrowUp}{ArrowUp}');
			expect(combobox).toHaveAttribute(
				'aria-activedescendant',
				'select-id-option-1'
			);

			await user.keyboard('{Enter}');
			expect(mockOnChange).toHaveBeenCalledWith(options[1]);
			expect(combobox).toHaveAttribute('aria-expanded', 'false');
		});
		it('should open/close menu', async () => {
			const { getByRole } = setup();
			const combobox = getByRole('combobox');
			const user = userEvent.setup();

			await user.click(combobox);

			await user.keyboard(' ');
			expect(combobox).toHaveAttribute('aria-expanded', 'true');

			await user.keyboard('{Escape}');
			expect(combobox).toHaveAttribute('aria-expanded', 'false');

			await user.keyboard('{Enter}');
			expect(combobox).toHaveAttribute('aria-expanded', 'true');

			await user.keyboard('{Tab}');
			expect(combobox).toHaveAttribute('aria-expanded', 'false');
		});
		it('should handle printable keys', async () => {
			const { getByRole } = setup();
			const user = userEvent.setup();

			const combobox = getByRole('combobox');
			await user.click(combobox);

			await user.keyboard('B');
			expect(combobox).toHaveAttribute(
				'aria-activedescendant',
				'select-id-option-1'
			);

			await user.keyboard('C');
			expect(combobox).toHaveAttribute(
				'aria-activedescendant',
				'select-id-option-2'
			);
		});
	});

	describe('mouse interactions', () => {
		it('should close the menu on outside click', async () => {
			const { getByRole } = setup();
			const user = userEvent.setup();

			const combobox = getByRole('combobox');
			await user.click(combobox);

			expect(combobox).toHaveAttribute('aria-expanded', 'true');
			await user.click(document.body);
			expect(combobox).toHaveAttribute('aria-expanded', 'false');
		});
		it('should handle focus on the select', async () => {
			const { getByRole } = setup();
			const user = userEvent.setup();

			const combobox = getByRole('combobox');

			await user.click(combobox);
			expect(combobox).toHaveFocus();
		});
		it('should handle mouse click on option', async () => {
			const { getByRole, getByText } = setup();
			const user = userEvent.setup();

			const combobox = getByRole('combobox');
			await user.click(combobox);

			const option = options[1];
			const optionElement = getByText(option.label);

			await user.click(optionElement);
			expect(mockOnChange).toHaveBeenCalledWith(option);
			expect(combobox).toHaveAttribute('aria-expanded', 'false');
		});
	});

	describe('edge cases', () => {
		it('should not open the menu if options list is empty', async () => {
			const { getByRole } = setup({ options: [] });
			const user = userEvent.setup();

			const combobox = getByRole('combobox');
			await user.click(combobox);

			expect(combobox).toHaveAttribute('aria-expanded', 'false');
			expect(mockSetIsOpen).not.toHaveBeenCalled();
		});
		it('should block interaction when only one option exists', async () => {
			const { getByRole } = setup({
				options: [options[0]],
			});
			const user = userEvent.setup();

			const combobox = getByRole('combobox');
			await user.click(combobox);

			await user.keyboard('{ArrowDown}');
			expect(combobox).not.toHaveAttribute('aria-activedescendant');
		});
		it('should scroll to highlighted option', async () => {
			const { getByRole, getByText } = setup();
			const user = userEvent.setup();

			const combobox = getByRole('combobox');
			await user.click(combobox);

			const option = options[1];
			const optionElement = getByText(option.label);

			await user.keyboard('{ArrowDown}');
			expect(optionElement.scrollIntoView).toHaveBeenCalled();
		});
	});
});

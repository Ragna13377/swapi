import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { Card } from '@shared/ui/Card';
import { CHEAP_COLOR_MAP } from '../constants';
import { mockCharacter } from './mocks';

describe('Card', () => {
	it('render all props', () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Card {...mockCharacter} onClick={handleClick} />
		);
		const name = getByText('Luke Skywalker');
		expect(name).toBeInTheDocument();
		expect(getByText('height')).toBeInTheDocument();
		expect(getByText('172')).toBeInTheDocument();
		expect(getByText('mass')).toBeInTheDocument();
		expect(getByText('77')).toBeInTheDocument();
		const genderBadge = getByText('male');
		expect(genderBadge).toBeInTheDocument();
		expect(genderBadge).toHaveStyle(
			`background-color: ${CHEAP_COLOR_MAP.gender.male}`
		);
		const birthBadge = getByText('19BBY');
		expect(birthBadge).toBeInTheDocument();
		expect(birthBadge).toHaveStyle(`background-color: ${CHEAP_COLOR_MAP.age}`);
		fireEvent.click(name);
		expect(handleClick).toHaveBeenCalled();
	});
	it('render without nullable props', () => {
		const character = {
			...mockCharacter,
			height: null,
			mass: null,
			gender: 'test',
			birthYear: null,
		};
		const { getByText, queryByText } = render(<Card {...character} />);

		expect(getByText('Luke Skywalker')).toBeInTheDocument();
		expect(queryByText('height')).not.toBeInTheDocument();
		expect(queryByText('mass')).not.toBeInTheDocument();
		expect(queryByText('test')).not.toBeInTheDocument();
		expect(queryByText('19BBY')).not.toBeInTheDocument();
	});
});

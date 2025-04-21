import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { mockNormalizedCharacter } from '@shared/mocks';
import { Card } from '@shared/ui/Card';
import { CHEAP_COLOR_MAP } from '../constants';

describe('Card', () => {
	it('should render with all props', () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Card {...mockNormalizedCharacter} onClick={handleClick} />
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
	it('should render without nullable props', () => {
		const character = {
			...mockNormalizedCharacter,
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

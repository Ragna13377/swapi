import { useMemo, useState } from 'react';
import type { TNormalizedCharacter } from '@shared/types';
import { ALL_OPTION } from '@entities/Select/constants';
import { TSelectOption } from '@entities/Select/types';
import { initialFilterState } from '../constants';
import { TActiveFilter } from '../types';

export const useFilter = (characters: TNormalizedCharacter[]) => {
	const [activeFilter, setActiveFilter] =
		useState<TActiveFilter>(initialFilterState);

	const handleFilterCategoryChange = (option: TSelectOption) => {
		if (option === null) {
			setActiveFilter(initialFilterState);
		} else {
			setActiveFilter({
				category: option,
				categoryOption: option.value === 'all' ? ALL_OPTION : null,
			});
		}
	};
	const handleFilterOptionChange = (option: TSelectOption) => {
		setActiveFilter((prev) => ({
			...prev,
			categoryOption: option,
		}));
	};

	const filteredCharacters = useMemo(() => {
		if (!activeFilter.category || !activeFilter.categoryOption) {
			return characters;
		}
		const { category, categoryOption } = activeFilter;
		if (categoryOption.value === 'all') return characters;
		return characters.filter((char) => {
			const charValue = char[category.value as keyof TNormalizedCharacter];
			if (charValue === null && categoryOption.value === 'none') return true;
			if (charValue === null) return false;
			switch (category.value) {
				case 'name':
					return charValue
						.toLowerCase()
						.startsWith(categoryOption.value.toLowerCase());
				case 'height':
				case 'mass':
				case 'birthYear': {
					const numericValue = parseFloat(charValue);
					if (isNaN(numericValue)) return false;
					const [from, to] = categoryOption.value.split('-').map(Number);
					return numericValue >= from && numericValue <= to;
				}
				case 'gender':
				case 'eyeColor':
				case 'hairColor':
				case 'skinColor': {
					const values =
						category.value === 'gender'
							? [charValue]
							: charValue.split(',').map((s) => s.trim());
					return values.includes(categoryOption.value);
				}
				default:
					return false;
			}
		});
	}, [characters, activeFilter]);

	return {
		filteredCharacters,
		activeFilter,
		handleFilterCategoryChange,
		handleFilterOptionChange,
	};
};

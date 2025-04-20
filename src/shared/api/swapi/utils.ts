import {
	isGender,
	type TGender,
	type TNormalizedCharacter,
} from '@shared/types';
import type { CharacterResponse } from './schema';
import { wrongValues } from './constants';

const normalizeNullableString = (value: string): string | null =>
	wrongValues.includes(value) ? null : value;
const normalizeGender = (value: string): TGender | null =>
	isGender(value) ? value : null;
const normalizeNumericString = (value: string): string | null => {
	const normalizedValue = normalizeNullableString(value);
	return normalizedValue ? normalizedValue.replace(',', '') : null;
};
export const getIdFromUrl = (url: string): string => {
	const match = url.match(/\/(\d+)\/?$/);
	return match ? match[1] : '';
};

export const normalizeCharacters = ({
	name,
	height,
	mass,
	gender,
	birth_year,
	eye_color,
	hair_color,
	skin_color,
	url,
}: CharacterResponse): TNormalizedCharacter => ({
	name,
	id: getIdFromUrl(url),
	height: normalizeNumericString(height),
	mass: normalizeNumericString(mass),
	gender: normalizeGender(gender),
	birthYear: normalizeNullableString(birth_year),
	eyeColor: normalizeNullableString(eye_color),
	hairColor: normalizeNullableString(hair_color),
	skinColor: normalizeNullableString(skin_color),
});

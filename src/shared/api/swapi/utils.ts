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

export const normalizeCharacters = ({
	name,
	height,
	mass,
	gender,
	birth_year,
	eye_color,
	hair_color,
	skin_color,
}: CharacterResponse): TNormalizedCharacter => ({
	name,
	height: height,
	mass: mass,
	gender: normalizeGender(gender),
	birthYear: normalizeNullableString(birth_year),
	eyeColor: normalizeNullableString(eye_color),
	hairColor: normalizeNullableString(hair_color),
	skinColor: skin_color,
});

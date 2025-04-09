export type TGender = keyof typeof GenderEnum;

export enum GenderEnum {
	male = 'male',
	female = 'female',
	hermaphrodite = 'hermaphrodite',
}

export const isGender = (value: string): value is TGender =>
	Object.values(GenderEnum).includes(value as GenderEnum);

export type TNormalizedCharacter = {
	name: string;
	height: string;
	mass: string;
	gender: string | null;
	birthYear: string | null;
	eyeColor: string | null;
	hairColor: string | null;
	skinColor: string;
};

export type TTimeout = ReturnType<typeof setTimeout> | null;

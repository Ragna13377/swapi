import { CardDetail } from '@shared/ui/CardDetail';
import { useLoaderData } from 'react-router-dom';
import { TNormalizedCharacter } from '@shared/types';

export const CharacterDetails = () => {
	const response = useLoaderData<TNormalizedCharacter>();
	return <CardDetail {...response} />;
};

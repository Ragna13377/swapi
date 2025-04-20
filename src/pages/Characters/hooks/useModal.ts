import { useState } from 'react';
import { TNormalizedCharacter } from '@shared/types';

export const useModal = () => {
	const [selectedCharacter, setSelectedCharacter] =
		useState<TNormalizedCharacter | null>(null);

	const handleCardClick = (character: TNormalizedCharacter) => {
		setSelectedCharacter(character);
	};
	const handleModalClose = () => {
		setSelectedCharacter(null);
	};

	return {
		handleCardClick,
		handleModalClose,
		selectedCharacter,
	};
};

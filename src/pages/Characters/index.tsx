import { Card } from '@shared/ui/Card';
import { CardDetail } from '@shared/ui/CardDetail';
import { Modal } from '@entities/Modal';
import { Select } from '@entities/Select';
import { TFilterCategory } from './types';
import { useFilter } from './hooks/useFilter';
import { useInfinityScroll } from './hooks/useInfinityScroll';
import { useLoadData } from './hooks/useLoadData';
import { useModal } from './hooks/useModal';
import { StyledCharacters } from './styles';

export const Characters = () => {
	const { count, characters, filters, isLoading, error, hasMore, onLoadMore } =
		useLoadData();
	const {
		filteredCharacters,
		activeFilter,
		handleFilterOptionChange,
		handleFilterCategoryChange,
	} = useFilter(characters);
	const { containerRef } = useInfinityScroll({
		onLoadMore,
		isEnabled: hasMore,
		charactersCount: characters.length,
	});
	const { handleModalClose, handleCardClick, selectedCharacter } = useModal();

	return (
		<StyledCharacters.ContentWrapper>
			<StyledCharacters.Title>
				{count} <span>Peoples</span> for you to choose your favorite
			</StyledCharacters.Title>
			<StyledCharacters.FilterContainer>
				<Select
					id='filter-category'
					activeValue={activeFilter.category}
					onChange={handleFilterCategoryChange}
					options={filters.categories}
					placeholder='Select category'
				/>
				<Select
					id='filter-category-option'
					activeValue={activeFilter.categoryOption}
					onChange={handleFilterOptionChange}
					options={
						activeFilter.category?.value
							? filters.optionsByCategory[
									activeFilter.category.value as TFilterCategory
								] || []
							: []
					}
					placeholder='Select option'
				/>
			</StyledCharacters.FilterContainer>
			{characters.length > 0 && (
				<StyledCharacters.CardContainer ref={containerRef}>
					{filteredCharacters.map((character) => (
						<Card
							key={character.id}
							onClick={() => handleCardClick(character)}
							{...character}
						/>
					))}
				</StyledCharacters.CardContainer>
			)}
			<Modal isOpen={!!selectedCharacter} onClose={handleModalClose}>
				{selectedCharacter && <CardDetail {...selectedCharacter} />}
			</Modal>
		</StyledCharacters.ContentWrapper>
	);
};

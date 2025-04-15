import { Card } from '@shared/ui/Card';
import { Select } from '@entities/Select';
import { useFilter } from './hooks/useFilter';
import {
	StyledCardWrapper,
	StyledContentWrapper,
	StyledFilterWrapper,
	StyledTitle,
} from './styles';
import { TFilterCategory } from './types';
import { useInfinityScroll } from '@pages/Characters/hooks/useInfinityScroll';
import { useLoadData } from '@pages/Characters/hooks/useLoadData';

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

	return (
		<StyledContentWrapper>
			<StyledTitle>
				{count} <span>Peoples</span> for you to choose your favorite
				{/*{characters.length}*/}
			</StyledTitle>
			<StyledFilterWrapper>
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
			</StyledFilterWrapper>
			{characters.length > 0 && (
				<StyledCardWrapper ref={containerRef}>
					{filteredCharacters().map((character, index) => (
						<Card key={index} {...character} />
					))}
				</StyledCardWrapper>
			)}
		</StyledContentWrapper>
	);
};

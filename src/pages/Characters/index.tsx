import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { PaginationResponse } from '@shared/api/swapi/schema';
import { normalizeCharacters } from '@shared/api/swapi/utils';
import { swapi } from '@shared/api/swapi';
import { Card } from '@shared/ui/Card';
import { Select } from '@entities/Select';
import { PageWrapper } from '@shared/ui/PageWrapper';
import { useInfinityScroll } from './hooks/useInfinityScroll';
import { useFilter } from './hooks/useFilter';
import {
	StyledCardWrapper,
	StyledContentWrapper,
	StyledFilterWrapper,
	StyledTitle,
} from './styles';
import { TFilterCategory } from './types';

export const Characters = () => {
	const [page, setPage] = useState(1);

	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: ['characters', page],
		queryFn: () => swapi.getCharacters(page),
		select: (rawData) => {
			if (!rawData) return null;
			return {
				...rawData,
				results: rawData.results.map(normalizeCharacters),
			};
		},
		enabled: page >= 1,
	});

	const [{ count, next }, setPagination] = useState<PaginationResponse>({
		count: 0,
		next: null,
		prev: null,
	});

	const {
		characters,
		hasCharacters,
		addNewCharacters,
		filteredCharacters,
		activeFilter,
		filters,
		handleFilterOptionChange,
		handleFilterCategoryChange,
	} = useFilter();

	const handleIntersect = useCallback(() => {
		if (isFetching) return;
		setPage((prev) => prev + 1);
	}, [next, isFetching]);
	const { containerRef } = useInfinityScroll({
		onIntersect: handleIntersect,
		intersectedElementFromEnd: 4,
		isDisabled: next === null,
	});

	useEffect(() => {
		if (data) {
			const { results, ...rest } = data;
			addNewCharacters(results);
			setPagination({ ...rest });
		}
	}, [data]);

	return (
		<PageWrapper>
			<StyledContentWrapper>
				<StyledTitle>
					{count} <span>Peoples</span> for you to choose your favorite{' '}
					{characters.length} {next}
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
				{hasCharacters && (
					<StyledCardWrapper ref={containerRef}>
						{filteredCharacters().map((character, index) => (
							<Card key={index} {...character} />
						))}
					</StyledCardWrapper>
				)}
			</StyledContentWrapper>
		</PageWrapper>
	);
};

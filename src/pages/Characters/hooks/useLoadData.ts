import { useCallback, useEffect, useState } from 'react';
import type { PaginationResponse } from '@shared/api/swapi/schema';
import { useQuery } from '@tanstack/react-query';
import { swapi } from '@shared/api/swapi';
import { normalizeCharacters } from '@shared/api/swapi/utils';
import { TNormalizedCharacter } from '@shared/types';
import { useLoaderData } from 'react-router-dom';
import { defaultCharactersLoadPages } from '@shared/constants';
import { TFiltersMap } from '@pages/Characters/types';
import { generateFilters } from '@pages/Characters/utils';

export const useLoadData = () => {
	const { results, ...pagination } = useLoaderData<
		{ results: TNormalizedCharacter[] } & PaginationResponse
	>();
	const [filters, setFilters] = useState<TFiltersMap>({
		categories: [],
		optionsByCategory: {
			all: [],
		},
	});
	const [page, setPage] = useState(defaultCharactersLoadPages);
	const [characters, setCharacters] = useState(results);
	const [{ count, next }, setPagination] = useState(pagination);

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
		enabled: page > defaultCharactersLoadPages && !!next,
	});

	useEffect(() => {
		if (data) {
			const { results, ...rest } = data;
			const allCharacters = [...characters, ...results];
			const newFilters = generateFilters(allCharacters);
			setCharacters(allCharacters);
			setFilters(newFilters);
			setPagination({ ...rest });
		}
	}, [data]);

	return {
		count,
		characters,
		filters,
		isLoading,
		error,
		hasMore: !!next,
		onLoadMore: () => {
			if (!isFetching) setPage((prev) => prev + 1);
		},
	};
};

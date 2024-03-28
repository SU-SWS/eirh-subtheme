import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import algoliaClient from "../utilities/algoliaClient";
import { SearchIndex } from "algoliasearch/lite";
import { type AlgoliaFilterItem } from "../utilities/types";

/**
 * Consts
 * ******************************************************************************************
 */

  // Get the filter data for the index.
export const facetFieldNamesMap = {
  venues: 'type_of_space_or_venue',
  vendors: 'service_type',
  policies: 'logistics_categories',
} as const;

/**
 * Hook
 * ******************************************************************************************
 */

export default function useFilters() {
  const { isReady, isLoading, isError, filters, selectedFilters, groupedFilters, sortBy } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const indexName = 'SERENE ALL - appEb3LGlZS9OfNrK - Relationships'; // Default.

  // Get the filter name for the index.
  const getIndexFilterName = (index: 'venues' | 'vendors' | 'policies') => {
    return facetFieldNamesMap[index];
  }

  /**
   * Get the filter data from the index first.
   */
  useEffect(() => {
    // Load only once..
    if (isReady || isError || isLoading) {
      return;
    }
    const fetchData = async () => {
      dispatch({ type: 'filters/setIsLoading', payload: true });
      try {
        const index:SearchIndex = await algoliaClient.initIndex(indexName);
        const { hits } = await index.search<AlgoliaFilterItem>('', { hitsPerPage: 1000 });
        dispatch({ type: 'filters/setData', payload: hits });
        dispatch({ type: 'filters/setIsReady', payload: true});
        dispatch({ type: 'filters/setIsLoading', payload: false });
      }
      catch (error) {
        console.error('Error fetching data from Algolia:', error);
        dispatch({ type: 'filters/setIsError', payload: true });
        dispatch({ type: 'filters/setIsLoading', payload: false });
        return;
      }
    }

    fetchData();
  }, [isError, isLoading, isReady, dispatch]);

  return {
    getIndexFilterName,
    selectedFilters,
    groupedFilters,
    filters,
    sortBy,
    isReady,
    isLoading,
    isError
  };
}

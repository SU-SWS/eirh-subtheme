import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import algoliaClient from "../utilities/algoliaClient";
import { type AlgoliaHit, restructureData } from "../utilities/algoliaFiltersData";
import { SearchIndex } from "algoliasearch/lite";
import { EventFeatureGroupItem } from "../utilities/algoliaFiltersData";

/**
 * Types & Interfaces
 * ******************************************************************************************
 */
export interface DataItem {
  event_feature: string;
  feature_group: string;
  'policies:_logistics_categories_column': string[];
  'vendors:_service_type': string[];
  'venues:_space_type': string[];
  weight: number;
}

export type FilterHitType = AlgoliaHit & DataItem;

  // Get the filter data for the index.
export const algoliaFacetMap = {
  venues: 'type_of_space_or_venue',
  vendors: 'service_type',
  policies: 'logistics_categories',
} as const;

/**
 * Hook
 * ******************************************************************************************
 */

export default function useFilters() {
  const { isReady, isLoading, isError, data, selectedFilters } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const indexName = 'SERENE ALL - appEb3LGlZS9OfNrK - Relationships';

  // Get the filter name for the index.
  const getIndexFilterName = (index: 'venues' | 'vendors' | 'policies') => {
    return algoliaFacetMap[index];
  }

  // Normalize the selected filters for Algolia.
  const normailzeSelectedFiltersForAlgolia = (filters: EventFeatureGroupItem[], activeTab: keyof typeof algoliaFacetMap) => {
    const normal:string[] = [];
    const attribute = getIndexFilterName(activeTab);
    for (const filter of filters) {
      const filterSet = filter[activeTab];
      if (!filterSet) { continue; }
      // for each filter set, add the filter to the normal array.
      for (let filterItem of filterSet) {
        // For the any/all filter, we need to use a wildcard.
        if (filterItem === 'Any/All') { filterItem = '-Any/All'; }
        if (!normal.includes(`${attribute}:${filterItem}`)) {
          // Add the the array.
          normal.push(`${attribute}:${filterItem}`);
        }
      }
    }
    return normal;
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
        const { hits } = await index.search<FilterHitType>('', { hitsPerPage: 1000 });
        const formattedData = restructureData(hits);
        dispatch({ type: 'filters/setData', payload: formattedData });
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
    normailzeSelectedFiltersForAlgolia,
    getIndexFilterName,
    selectedFilters,
    filterData: data,
    isReady,
    isLoading,
    isError
  };
}

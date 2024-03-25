import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import algoliaClient from "../utilities/algoliaConfig";
import { type AlgoliaHit, restructureData } from "../utilities/algoliaFiltersData";
import { SearchIndex } from "algoliasearch";

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

/**
 * Hook
 * ******************************************************************************************
 */

export default function useFilters() {
  const { isReady, isLoading, isError, data } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const indexName = 'SERENE ALL - appEb3LGlZS9OfNrK - Relationships';

  // const algoliaFacetMap = {
  //   venues: 'type_of_space_or_venue',
  //   vendors: 'service_type',
  //   policies: 'logistics_categories',
  // } as const;

  useEffect(() => {
    // Load only once..
    if (isReady || isError || isLoading) {
      return;
    }
    console.log('Fetching filters data...');
    const fetchData = async () => {
      // Wait 5 seconds
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
  }, [isError, isLoading, isReady, dispatch, algoliaClient]);

  return {
    filterData: data,
    isReady,
    isLoading,
    isError
  };
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppTabs } from '../../utilities/types';
import { facetFieldNamesMap } from '../../hooks/useFilters';

/**
 * Types and interfaces
 * ******************************************************************************************************
 */
export interface AppState {
  tab: AppTabs;
  index: typeof algoliaIndexMap[keyof typeof algoliaIndexMap];
  field: string;
  isLoading: boolean;
  isReady: boolean;
  isError: boolean;
}

/**
 * Vars and constants
 * ******************************************************************************************************
 */
export const algoliaIndexMap = {
  venues: 'SERENE ALL - appEb3LGlZS9OfNrK - Venues',
  vendors: 'SERENE ALL - appEb3LGlZS9OfNrK - Vendors',
  policies: 'SERENE ALL - appEb3LGlZS9OfNrK - Policies',
} as const;

export const algoliaSuggestionsIndexMap = {
  venues: 'venues_query_suggestions',
  vendors: 'vendors_query_suggestions',
  policies: 'policies_query_suggestions',
} as const;

const initialState: AppState = {
  tab: 'venues', // Default tab.
  index: algoliaIndexMap.venues,
  field: facetFieldNamesMap.venues,
  isLoading: false,
  isReady: false,
  isError: false,
};

/**
 * Slice
 * ******************************************************************************************************
 */
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTab : (state, action: PayloadAction<AppTabs>) => {
      console.log('setTab', action.payload);
      state.tab = action.payload;
      state.index = algoliaIndexMap[action.payload];
      state.field = facetFieldNamesMap[action.payload];
    },
    setIndex: (state, action: PayloadAction<typeof algoliaIndexMap[keyof typeof algoliaIndexMap]>) => {
      state.index = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

export const { setTab, setIsLoading, setIsError, setIsReady } = appSlice.actions;
export const selectAppData = (state: { app: AppState }) => state.app;
export default appSlice.reducer;

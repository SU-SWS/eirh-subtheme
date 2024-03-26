import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Types and interfaces
 * ******************************************************************************************************
 */
export interface AppState {
  tab: 'venues' | 'vendors' | 'policies';
  index: typeof algoliaIndexMap[keyof typeof algoliaIndexMap];
  isLoading: boolean;
  isReady: boolean;
  isError: boolean;
}

export type tabType = keyof typeof algoliaIndexMap;

/**
 * Vars and constants
 * ******************************************************************************************************
 */
const algoliaIndexMap = {
  venues: 'SERENE ALL - appEb3LGlZS9OfNrK - Venues',
  vendors: 'SERENE ALL - appEb3LGlZS9OfNrK - Vendors',
  policies: 'SERENE ALL - appEb3LGlZS9OfNrK - Policies',
} as const;

const initialState: AppState = {
  tab: 'venues', // Default tab.
  index: algoliaIndexMap.venues,
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
    setTab : (state, action: PayloadAction<tabType>) => {
      state.tab = action.payload;
      state.index = algoliaIndexMap[action.payload];
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

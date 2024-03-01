// slices/autocompleteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchResultState {
  results: SearchResult[];
  // TODO: Define properties
}

interface SearchResult {
  id: string;
  // TODO: Define properties
}

const initialState: SearchResultState = {
  results: [],
};

export const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    },
  },
});

export const { setResults } = searchResultSlice.actions;
export default searchResultSlice.reducer;

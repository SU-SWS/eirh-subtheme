import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  selectedFilters: string[];
}

const initialState: FiltersState = {
  selectedFilters: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string>) => {
      state.selectedFilters.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.selectedFilters = state.selectedFilters.filter(filter => filter !== action.payload);
    },
    clearFilters: (state) => {
      state.selectedFilters = [];
    }
  },
});

export const { addFilter, removeFilter, clearFilters } = filterSlice.actions;
export const selectFilters = (state: { filters: FiltersState }) => state.filters.selectedFilters;
export default filterSlice.reducer;

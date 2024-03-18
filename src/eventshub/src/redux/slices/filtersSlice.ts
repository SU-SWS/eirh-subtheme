import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventFeatureGroupItem } from '../../utilities/algoliaFiltersData';

interface FiltersState {
  selectedFilters: EventFeatureGroupItem[];
}

const initialState: FiltersState = {
  selectedFilters: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<EventFeatureGroupItem>) => {
      state.selectedFilters.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<EventFeatureGroupItem>) => {
      state.selectedFilters = state.selectedFilters.filter(
        (filter) => filter.event_feature !== action.payload.event_feature
      );
    },
    clearFilters: (state) => {
      state.selectedFilters = [];
    }
  },
});

export const { addFilter, removeFilter, clearFilters } = filtersSlice.actions;
export const selectFilters = (state: { filters: FiltersState }) => state.filters.selectedFilters;
export default filtersSlice.reducer;

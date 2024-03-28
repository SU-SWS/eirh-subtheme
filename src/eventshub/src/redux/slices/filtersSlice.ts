import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type AlgoliaFilterItem, type FormattedFilterItem } from '../../utilities/types';

interface FiltersState {
  isLoading: boolean;
  isReady: boolean;
  isError: boolean;
  rawData: AlgoliaFilterItem[];
  filters: FormattedFilterItem;
  sortBy: 'relevance' | 'asc' | 'desc';
  groupedFilters: { [key: string]: { name: string, weight: number }[] };
  selectedFilters: string[];
}

const initialState: FiltersState = {
  isLoading: false,
  isReady: false,
  isError: false,
  rawData: [],
  filters: {},
  sortBy: 'relevance',
  selectedFilters: [],
  groupedFilters: {},
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string>) => {
      state.selectedFilters.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      // Find the index of the filter to remove.
      const index = state.selectedFilters.indexOf(action.payload);
      // Remove the filter.
      state.selectedFilters.splice(index, 1);
    },
    toggleFilter: (state, action: PayloadAction<string>) => {
      const index = state.selectedFilters.indexOf(action.payload);
      if (index === -1) {
        state.selectedFilters.push(action.payload);
      } else {
        state.selectedFilters.splice(index, 1);
      }
    },
    setFilters : (state, action: PayloadAction<string[]>) => {
      state.selectedFilters = action.payload;
    },
    clearFilters: (state) => {
      state.selectedFilters = [];
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
    setData: (state, action: PayloadAction<AlgoliaFilterItem[]>) => {
      state.rawData = action.payload;
      state.filters = {};
      state.groupedFilters = {};

      // Group the filters by feature_group.
      action.payload.forEach((item) => {
        if (!item.feature_group) { return; } // Skip if no feature_group.
        if (item.feature_group === "All") { return; } // Skip if feature_group is "All".
        if (!state.groupedFilters[item.feature_group]) {
          state.groupedFilters[item.feature_group] = [];
        }
        state.groupedFilters[item.feature_group].push({ name: item.event_feature, weight: item.weight });
      });

      // Sort the filters by weight.
      Object.keys(state.groupedFilters).forEach((key) => {
        state.groupedFilters[key].sort((a, b) => {
          return a.weight - b.weight;
        });
      });

      // Create a map of filters.
      action.payload.forEach((item) => {
        if (!item.feature_group) { return; } // Skip if no feature_group.
        if (item.feature_group === "All") { return; } // Skip if feature_group is "All".
        state.filters[item.event_feature] = {
          vendors: item['vendors:_service_type'],
          venues: item['venues:_space_type'],
          policies: item['policies:_logistics_categories_column'] };
      });
    },
    setSortBy: (state, action: PayloadAction<'relevance' | 'asc' | 'desc'>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addFilter, removeFilter, clearFilters, setFilters, setIsError, setIsLoading, setIsReady, setData, setSortBy } = filtersSlice.actions;
export const selectFilters = (state: { filters: FiltersState }) => state.filters.selectedFilters;
export default filtersSlice.reducer;

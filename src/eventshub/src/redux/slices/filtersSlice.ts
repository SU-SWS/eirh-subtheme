import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type EventFeatureGroupItem, type GroupedDataItem } from '../../utilities/algoliaFiltersData';

interface FiltersState {
  data: GroupedDataItem[];
  keys: {
    [key: string]:
    {
      vendors: string[],
      venues: string[],
      policies: string[]
    }
  };
  isLoading: boolean;
  isReady: boolean;
  isError: boolean;
  selectedFilters: EventFeatureGroupItem[];
}

const initialState: FiltersState = {
  data: [],
  keys: {},
  isLoading: false,
  isReady: false,
  isError: false,
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
    setFilters : (state, action: PayloadAction<EventFeatureGroupItem[]>) => {
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
    setData: (state, action: PayloadAction<GroupedDataItem[]>) => {
      state.data = action.payload;
      // Loop through each item's event_feature_group and add the event_feature as the key to the keys object.
      // and the venues, vendors, and policies as the values.
      for (const item of action.payload) {
        const filters = item.event_feature_group;
        // for each filter, add the filter to the keys object.
        for (const filter of filters) {
          const key = filter.event_feature;
          const vendors = filter.vendors;
          const venues = filter.venues;
          const policies = filter.policies;
          state.keys[key] = { vendors, venues, policies };
        }
      }
    }
  },
});

export const { addFilter, removeFilter, clearFilters, setFilters, setIsError, setIsLoading, setIsReady, setData } = filtersSlice.actions;
export const selectFilters = (state: { filters: FiltersState }) => state.filters.selectedFilters;
export default filtersSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type EventFeatureGroupItem, type GroupedDataItem } from '../../utilities/algoliaFiltersData';

interface FiltersState {
  data: GroupedDataItem[];
  isLoading: boolean;
  isReady: boolean;
  isError: boolean;
  selectedFilters: EventFeatureGroupItem[];
}

const initialState: FiltersState = {
  data: [],
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
      console.log('Payload: ', action.payload);
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
    }
  },
});

export const { addFilter, removeFilter, clearFilters, setFilters, setIsError, setIsLoading, setIsReady, setData } = filtersSlice.actions;
export const selectFilters = (state: { filters: FiltersState }) => state.filters.selectedFilters;
export default filtersSlice.reducer;

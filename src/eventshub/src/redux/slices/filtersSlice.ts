import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  values: Record<string, string>;
}

interface SetFilterPayload {
  filterType: string;
  value: string;
}

const initialState: FiltersState = {
  values: {},
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      const { filterType, value } = action.payload;
      state.values[filterType] = value;
    },
    clearFilters: (state) => {
      state.values = {};
    },
  },
});

export const { setFilter, clearFilters } = filtersSlice.actions;

type RootState = {
  filters: FiltersState;
};

export const selectFilters = (state: RootState) => state.filters.values;

export default filtersSlice.reducer;

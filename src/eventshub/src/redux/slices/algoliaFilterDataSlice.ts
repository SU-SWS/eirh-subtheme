import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupedDataItem } from '../../utilities/algoliaFiltersData';

interface AlgoliaFilterDataState {
  data: GroupedDataItem[];
}

const initialState: AlgoliaFilterDataState = {
  data: [],
};

const algoliaFilterDataSlice = createSlice({
  name: 'algoliaFilterData',
  initialState,
  reducers: {
    setAlgoliaFilterData(state, action: PayloadAction<GroupedDataItem[]>) {
      state.data = action.payload;
    },
  },
});

export const { setAlgoliaFilterData } = algoliaFilterDataSlice.actions;
export const selectAlgoliaFilterData = (state: { algoliaFilterData: AlgoliaFilterDataState }) => state.algoliaFilterData.data;
export default algoliaFilterDataSlice.reducer; 
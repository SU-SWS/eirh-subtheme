import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchTypeState {
  activeTab: string;
}

const initialState: SearchTypeState = {
  activeTab: 'venues',
};

export const searchTypeSlice = createSlice({
  name: 'searchType',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = searchTypeSlice.actions;
export const selectActiveTab = (state: { searchType: SearchTypeState }) => state.searchType.activeTab;
export default searchTypeSlice.reducer;

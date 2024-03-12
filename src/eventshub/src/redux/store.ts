import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filtersSlice';
import algoliaFilterDataReducer from './slices/algoliaFilterDataSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    algoliaFilterData: algoliaFilterDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
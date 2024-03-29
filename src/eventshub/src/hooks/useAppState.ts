/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { createAction } from '@reduxjs/toolkit';
import { tabs } from '../redux/slices/appSlice';

export default function useAppState() {
  const { isLoading, isReady, isError, tab, index, query, field } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  /**
   * Kick it off by loading the filter data.
   */
  useEffect(() => {
    // Fire this off only once.
    if (isReady || isError || isLoading) {
      return;
    }

    const fetchData = async () => {
      dispatch({ type: 'app/setIsLoading', payload: true });
      // Wait 1 seconds
      // TODO: Wait for InstantSearch????
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Get the URL search parameters
      const urlParams = new URLSearchParams(window.location.search);
      // Get the tab
      const tab = urlParams.get('tab');
      // Set the tab
      if (tab && tab in tabs) {
        dispatch({ type: 'app/setTab', payload: tab });
      }
      dispatch({ type: 'app/setIsReady', payload: true});
      dispatch({ type: 'app/setIsLoading', payload: false });

    };
    fetchData();
  }, [isReady, isError, isLoading, dispatch]);

  // ACTIONS
  const setActiveTab = createAction<string>('app/setTab');
  const setActiveIndex = createAction<string>('app/setIndex');
  const setActiveQuery = createAction<string>('app/setQuery');
  const clearActiveQuery = createAction('app/clearQuery');

  // EXPORT(ISH)
  return {
    setActiveTab,
    setActiveIndex,
    activeTab: tab,
    activeIndex: index,
    setActiveQuery,
    clearActiveQuery,
    activeQuery: query,
    activeField: field,
    isLoading,
    isReady,
    isError
  };
}

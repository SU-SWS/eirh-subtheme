/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: TYPE THE ANY.
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { createAction } from '@reduxjs/toolkit';

export interface UIState {
  [key: string]: {
    configure: {[key: string]: any};
    page ?: number;
    query ?: string;
  }
}

export type StateToRouteResponse = {
  q?: string;
  page?: number;
  food?: string[];
}

export interface RouteState {
  [key: string]: {
    page ?: number;
    q ?: string;
  }
}

export default function useAppState() {
  const { isLoading, isReady, isError, tab, index } = useAppSelector((state) => state.app);
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch({ type: 'app/setIsReady', payload: true});
      dispatch({ type: 'app/setIsLoading', payload: false });

    };
    fetchData();
  }, [isReady, isError, isLoading, dispatch]);

  // ACTIONS
  const setActiveTab = createAction<string>('app/setTab');
  const setActiveIndex = createAction<string>('app/setIndex');

  // FUNCTIONS


  // EXPORT(ISH)
  return {
    setActiveTab,
    setActiveIndex,
    activeTab: tab,
    activeIndex: index,
    isLoading,
    isReady,
    isError
  };
}

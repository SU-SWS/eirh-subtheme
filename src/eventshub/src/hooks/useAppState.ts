import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { createAction } from '@reduxjs/toolkit';

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

    console.log('LOADING URL DATA...');
    const fetchData = async () => {
      dispatch({ type: 'app/setIsLoading', payload: true });
      // Wait 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log('App data loaded! (app)');
      dispatch({ type: 'app/setIsReady', payload: true});
      dispatch({ type: 'app/setIsLoading', payload: false });

    };
    fetchData();
  }, [isReady, isError, isLoading, dispatch]);

  // Actions.
  const setActiveTab = createAction<string>('app/setTab');
  const setActiveIndex = createAction<string>('app/setIndex');

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

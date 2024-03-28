import { useEffect, useLayoutEffect } from "react";
import { useInstantSearch } from "react-instantsearch-core";
import { useAppState, useFilters } from "../../hooks";
import type { UiState, InstantSearch } from 'instantsearch.js';
import { useAppDispatch } from "../../redux/store";
import { algoliaIndexMap } from "../../redux/slices/appSlice";

export type UIStateProps = {
  uiState: UiState
}

function middleware({ instantSearchInstance }: { instantSearchInstance: InstantSearch }) {
  return {
    onStateChange({ uiState }: UIStateProps) {
      // Do something with `uiState` every time the state changes.
      console.log('uiState:', uiState)
      console.log('instantSearchInstance:', instantSearchInstance);
    },
    subscribe() {
      // Do something when the InstantSearch instance starts.
    },
    unsubscribe() {
      // Do something when the InstantSearch instance is disposed of.
    }
  }
}

export default function Middleware() {
  const {
    indexUiState,
    setIndexUiState,
    // uiState,
    // setUiState,
    // indexRenderState,
    // renderState,
    // results,
    // scopedResults,
    refresh,
    // status,
    // error,
    addMiddlewares,
  } = useInstantSearch();
  const dispatch = useAppDispatch();
  const { activeIndex, activeTab, setActiveIndex } = useAppState();
  const { filters, selectedFilters, getIndexFilterName, sortBy } = useFilters();
  const field = getIndexFilterName(activeTab);

console.log('indexUiState', indexUiState);
// console.log('uiState', uiState);
// console.log('indexRenderState', indexRenderState);
// console.log('renderState', renderState);
// console.log('results', results);
// console.log('scopedResults', scopedResults);
// console.log('status', status);
// console.log('error', error);

  /**
   * Whenever a filter is changed, update the UI state.
   * Whenever the active tab changes, update the UI state.
   */
  useEffect(() => {
    const refineFilters:string[] = [];
    for (const filter of selectedFilters) {
      refineFilters.push(...filters[filter][activeTab])
    }
    // make a unique list
    const uniqueFilters = [...new Set(refineFilters)];
    // Change `Any/All` to `-Anything-And-Everything` to reverse search results.
    if (uniqueFilters.includes('Any/All')) {
      uniqueFilters.push('-Anything-And-Everything');
    }
    setIndexUiState({refinementList: {[field]: uniqueFilters}});

  }, [selectedFilters, activeIndex, filters, setIndexUiState, field, activeTab]);

  /**
   * Add some middleware.
   */
  useLayoutEffect(() => {
    return addMiddlewares(middleware);
  }, [addMiddlewares]);

  return null;
}

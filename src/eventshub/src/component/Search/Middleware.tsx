import { useEffect, useLayoutEffect } from "react";
import { useInstantSearch } from "react-instantsearch-core";
import { useAppState, useFilters } from "../../hooks";
import type { UiState } from 'instantsearch.js';

export type UIStateProps = {
  uiState: UiState
}

function middleware() {
  return {
    onStateChange() {
      // Do something with `uiState` every time the state changes.
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
    // refresh,
    // status,
    // error,
    addMiddlewares,
  } = useInstantSearch();

  const { activeIndex, activeTab } = useAppState();
  const { filters, selectedFilters, getIndexFilterName } = useFilters();
  const field = getIndexFilterName(activeTab);

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
    setIndexUiState({ ...indexUiState, refinementList: { [field]: uniqueFilters }});

  }, [selectedFilters, activeIndex, filters, setIndexUiState]);


  /**
   * Add some middleware.
   */
  useLayoutEffect(() => {
    return addMiddlewares(middleware);
  }, [addMiddlewares]);

  return null;
}

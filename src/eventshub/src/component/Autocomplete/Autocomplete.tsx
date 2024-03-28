import { createElement, Fragment, useEffect, useRef } from 'react';
import {
  autocomplete,
  AutocompleteOptions,
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
import type { SearchClient } from 'algoliasearch/lite';
import { usePagination, useSearchBox } from 'react-instantsearch-core';
import { nanoid } from 'nanoid';
import { useAppState, useFilters } from '../../hooks';
import { algoliaSuggestionsIndexMap } from '../../redux/slices/appSlice';
import type { AutocompleteComponents } from '@algolia/autocomplete-js';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { AlgoliaVenueItem, AppTabs, FormattedFilterItem } from '../../utilities/types';
import { useAppDispatch } from '../../redux/store';

// TODO: Determine if we should build upon or remove algolia styles
import '@algolia/autocomplete-theme-classic';

type AutocompleteProps = Partial<AutocompleteOptions<AlgoliaVenueItem>> & {
  searchClient: SearchClient;
  searchIndex: string;
};

type SuggestionHitProps = {
  hit: AlgoliaVenueItem;
  components: AutocompleteComponents;
}

/**
 * Suggestion hit component.
 */
const SuggestionHit = ({ hit, components }:SuggestionHitProps ) => {
  return (
    <div className="aa-ItemWrapper">
      <div className="aa-ItemContent">
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <components.Highlight hit={hit} attribute="name" />
            {(hit.space_name && hit.space_name !== hit.venue_name) && ( <span> - {hit.space_name}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Formats the active filters for the search query.
 *
 * NOTE: This side effect logic is also reproduced in the autocomplete component in order
 * to determine which items are available to the autocomplete search.
 * @param selectedFilters - The selected filters.
 * @param filters - The filters key information.
 * @param field - The field for the current tab.
 * @param tab - The active tab.
 *
 * @returns The formatted filters in the format of [[field:filter, field:filter]].
 */
function formatSelectedFiltersForQuery(selectedFilters: string[], filters:FormattedFilterItem, field:string, tab:AppTabs) {
  // Loop through the selected filters and create the facetFilters array.
  const facetFilters:string[] = [];
  for (const filter of selectedFilters) {
    if (filter in filters) {
      facetFilters.push(...filters[filter][tab]);
    }
  }
  // make a unique list
  const uniqueFilters = [...new Set(facetFilters)];
  // Change `Any/All` to `-Anything-And-Everything` to reverse search results.
  if (uniqueFilters.includes('Any/All')) {
    uniqueFilters.push('-Anything-And-Everything');
  }
  // Prefix each filter with the field name.
  const returnFilters = uniqueFilters.map((filter) => `${field}:${filter}`);
  return [returnFilters];
}

/**
 * Autocomplete component.
 */
export function Autocomplete({
  searchClient,
  searchIndex,
  ...autocompleteProps
}: AutocompleteProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  const dispatch = useAppDispatch();
  const { refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();
  const { activeTab, activeQuery, setActiveQuery, clearActiveQuery, activeField } = useAppState();
  const { selectedFilters, filters } = useFilters();
  const suggestionsIndex = algoliaSuggestionsIndexMap[activeTab];

  useEffect(() => {
    if (!containerRef.current || !panelRef.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      container: containerRef.current,
      // panelContainer: panelRef.current,
      insights: true,
      id: nanoid(),
      getSources({query}) {
        return [
          {
            sourceId: activeTab,
            getItemInputValue: ({ item }) => {
              let ret = item.name;
              if (item.space_name && item.space_name !== item.venue_name) {
                ret = `${item.space_name} - ${item.space_name}`;
              }
              return ret;
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: searchIndex,
                    query,
                    params: {
                      facetFilters: formatSelectedFiltersForQuery(selectedFilters, filters, activeField, activeTab),
                    }
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return <SuggestionHit hit={item} components={components} />;
              },
              noResults({ state }) {
                return (
                  <div className="aa-PanelLayout aa-Panel--scrollable">
                    No results for "{state.query}"
                  </div>
                );
              },
            },
          },
        ];
      },
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;
          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }
        panelRootRef.current.render(children);
      },
      initialState: {
        // This uses the `search` query parameter as the initial query
        query: activeQuery,
      },
      onSubmit({ state, refresh }) {
        setPage(0);
        setQuery(state.query);
        dispatch(setActiveQuery(state.query));
        refresh();
      },
      onReset({refresh}) {
        setPage(0);
        setQuery('');
        dispatch(clearActiveQuery());
        refresh();
      },
      ...autocompleteProps,
    });

    return () => autocompleteInstance.destroy();
  }, [
    autocompleteProps,
    searchClient,
    suggestionsIndex,
    searchIndex,
    setQuery,
    setPage,
    activeTab,
    activeQuery,
    setActiveQuery,
    clearActiveQuery,
    selectedFilters,
    filters,
    activeField,
    dispatch
  ]);

  return (
    <>
      <div className="er-mb-36" ref={containerRef} />
      <div ref={panelRef} />
    </>
  );
}

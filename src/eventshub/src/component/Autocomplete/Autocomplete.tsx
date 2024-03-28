import { createElement, Fragment, useEffect, useRef } from 'react';
import {
  autocomplete,
  AutocompleteOptions,
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
import type { SearchClient } from 'algoliasearch/lite';
import { usePagination, useSearchBox } from 'react-instantsearch-core';
import { nanoid } from 'nanoid';
import { useAppState } from '../../hooks';
import { algoliaSuggestionsIndexMap } from '../../redux/slices/appSlice';
import type { AutocompleteComponents } from '@algolia/autocomplete-js';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { AlgoliaVenueItem } from '../../utilities/types';

// TODO: Determine if we should build upon or remove algolia styles
// import '@algolia/autocomplete-theme-classic';

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
          </div>
          {/* <div className="aa-ItemContentDescription">
            <strong>{hit.space_name}</strong>
          </div> */}
        </div>
      </div>
    </div>
  )
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

  const { refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();
  const { activeTab } = useAppState();
  const suggestionsIndex = algoliaSuggestionsIndexMap[activeTab];

  useEffect(() => {
    if (!containerRef.current || !panelRef.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      container: containerRef.current,
      // panelContainer: panelRef.current,
      id: nanoid(),
      getSources({query}) {
        return [
          {
            sourceId: 'products',
            getItemInputValue: ({ item }) => item.name,
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: searchIndex,
                    query,
                    // TODO: Add filter params.
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return <SuggestionHit hit={item} components={components} />;
              },
              noResults() {
                return 'No results.';
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
      onSubmit({ state, event, ...setters }) {
        console.log('onSubmit', state, event, setters);
        setPage(0);
        setQuery(state.query);
      },
      onReset({ state, event, ...setters }) {
        console.log('onReset', state, event, setters);
      },
      ...autocompleteProps,
    });

    return () => autocompleteInstance.destroy();
  }, [autocompleteProps, searchClient, suggestionsIndex, searchIndex, setQuery, setPage, activeTab]);

  return (
    <>
      <div className="er-mb-36" ref={containerRef} />
      <div ref={panelRef} />
    </>
  );
}

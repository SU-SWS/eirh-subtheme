import { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';

import { usePagination, useSearchBox } from 'react-instantsearch-core';
import {
  autocomplete,
  AutocompleteOptions,
  Render,
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
import { BaseItem } from '@algolia/autocomplete-core';
import { debounce } from '@algolia/autocomplete-shared';
import type { SearchClient } from 'algoliasearch/lite';

import '@algolia/autocomplete-theme-classic';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  searchClient: SearchClient;
  className?: string;
  searchIndex: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
};

export function Autocomplete({
  searchClient,
  className,
  searchIndex,
  ...autocompleteProps
}: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null);

  const { query, refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();

  const [instantSearchUiState, setInstantSearchUiState] =
    useState<SetInstantSearchUiStateOptions>({ query });
  const debouncedSetInstantSearchUiState = debounce(
    setInstantSearchUiState,
    500
  );

  useEffect(() => {
    setQuery(instantSearchUiState.query);
    setPage(0);
  }, [instantSearchUiState.query, setPage, setQuery]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      debug: true,
      container: autocompleteContainer.current,
      initialState: { query },
      getSources() {
        return [
          {
            sourceId: 'querySuggestions',
            getItemInputValue: ({ item }) => item.query,
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: searchIndex,
                    query,
                    params: {
                      hitsPerPage: 5,
                    },
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return components.ReverseHighlight({
                  hit: item,
                  attribute: 'query',
                });
              },
            },
          },
        ];
      },
      onReset() {
        setInstantSearchUiState({ query: '' });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      renderer: { createElement, Fragment, render: render as Render },
    });

    return () => autocompleteInstance.destroy();
  }, [autocompleteProps, query]);

  return <div className={className} ref={autocompleteContainer} />;
}

import React, { useMemo } from 'react';
import { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';

import { usePagination, useSearchBox } from 'react-instantsearch-core';
import {
  autocomplete,
  AutocompleteOptions,
  Render,
} from '@algolia/autocomplete-js';
import { BaseItem } from '@algolia/autocomplete-core';
import { debounce } from '@algolia/autocomplete-shared';
import type { SearchClient } from 'algoliasearch/lite';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

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

  const plugins = useMemo(() => {
    const querySuggestions = createQuerySuggestionsPlugin({
      searchClient,
      indexName: searchIndex,
      transformSource({ source }) {
        return {
          ...source,
          sourceId: 'querySuggestionsPlugin',
          onSelect({ item }) {
            setInstantSearchUiState({
              query: item.query,
              category: item.__autocomplete_qsCategory || '',
            });
          },
          getItems(params) {
            if (!params.state.query) {
              return [];
            }

            return source.getItems(params);
          },
          templates: {
            ...source.templates,
            header({ items }) {
              if (items.length === 0) {
                return <Fragment />;
              }

              return (
                <Fragment>
                  <span className='aa-SourceHeaderTitle'>
                    In other categories
                  </span>
                  <span className='aa-SourceHeaderLine' />
                </Fragment>
              );
            },
          },
        };
      },
    });

    return [querySuggestions];
  }, [searchClient, searchIndex]);

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
      container: autocompleteContainer.current,
      initialState: { query },
      plugins,
      onReset() {
        setInstantSearchUiState({ query: '' });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          debouncedSetInstantSearchUiState({
            query: state.query,
          });
        }
      },
      renderer: { createElement, Fragment, render: render as Render },
    });

    return () => autocompleteInstance.destroy();
  }, [autocompleteProps, query]);

  return <div className={className} ref={autocompleteContainer} />;
}

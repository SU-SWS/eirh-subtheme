import { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import {
  autocomplete,
  AutocompleteOptions,
  Render,
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
import { BaseItem } from '@algolia/autocomplete-core';
import type { SearchClient } from 'algoliasearch/lite';
import { usePagination, useSearchBox } from 'react-instantsearch-core';

import '@algolia/autocomplete-theme-classic';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

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

  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: searchIndex,
    getSearchParams() {
      return {
        hitsPerPage: 10,
      };
    },
  });

  useEffect(() => {
    setQuery(instantSearchUiState.query);
    setPage(0);
  }, [instantSearchUiState.query, setPage, setQuery]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      debug: true,
      container: autocompleteContainer.current,
      getSources() {
        return [
          {
            sourceId: 'uniqueIdTbd',
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: searchIndex,
                    query,
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return (
                  <div className='aa-ItemWrapper'>
                    <div className='aa-ItemContent'>
                      <div className='aa-ItemContentBody'>
                        <div className='aa-ItemContentTitle'>
                          <components.Snippet hit={item} attribute='name' />
                        </div>
                        <div className='aa-ItemContentDescription'>
                          <components.Snippet
                            hit={item}
                            attribute='description'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
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
      navigator: {
        navigate({ itemUrl }) {
          window.location.assign(itemUrl);
        },
        navigateNewTab({ itemUrl }) {
          const windowReference = window.open(itemUrl, '_blank', 'noopener');

          if (windowReference) {
            windowReference.focus();
          }
        },
        navigateNewWindow({ itemUrl }) {
          window.open(itemUrl, '_blank', 'noopener');
        },
      },
      ...autocompleteProps,
    });

    return () => autocompleteInstance.destroy();
  }, [autocompleteProps, searchClient, searchIndex]);

  return <div className={className} ref={autocompleteContainer} />;
}

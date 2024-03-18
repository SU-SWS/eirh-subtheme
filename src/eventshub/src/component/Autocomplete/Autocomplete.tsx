import { createElement, Fragment, useEffect, useRef, useState } from 'react';
import {
  autocomplete,
  AutocompleteOptions,
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
import { BaseItem } from '@algolia/autocomplete-core';
import type { SearchClient } from 'algoliasearch/lite';
import { usePagination, useSearchBox } from 'react-instantsearch-core';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

// TODO: Determine if we should build upon or remove algolia styles
import '@algolia/autocomplete-theme-classic';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  searchClient: SearchClient;
  className?: string;
  searchIndex: string;
  filtersQuery?: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
};

export function Autocomplete({
  searchClient,
  className,
  searchIndex,
  filtersQuery,
  ...autocompleteProps
}: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  const { query, refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();

  const [instantSearchUiState, setInstantSearchUiState] =
    useState<SetInstantSearchUiStateOptions>({ query });
  
  useEffect(() => {
    setQuery(instantSearchUiState.query);
    setPage(0);
  }, [instantSearchUiState.query, setPage, setQuery]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
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
                    params: {
                      filters: filtersQuery,
                    }
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
      renderer: {
        createElement, Fragment, render: () => {
        }
      },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
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
  }, [autocompleteProps, filtersQuery, searchClient, searchIndex]);

  return <div className={className} ref={autocompleteContainer} />;
}

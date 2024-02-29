import {
  InstantSearch,
  Hits,
  Configure,
  Pagination,
} from 'react-instantsearch';
import { Autocomplete } from '../Autocomplete';
import { SearchItem } from '../SearchItem';
import searchClient from '../../utils/algoliaConfig';

type SearchTabProps = {
  searchIndex: string;
};

export const SearchTab = ({ searchIndex }: SearchTabProps) => {
  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName={searchIndex}
        routing
      >
        <Configure hitsPerPage={40} />
        <Autocomplete
          searchClient={searchClient}
          searchIndex={searchIndex}
          placeholder='Search by venues'
          detachedMediaQuery='none'
          openOnFocus
        />
        <Hits hitComponent={SearchItem} />
        <Pagination />
      </InstantSearch>
    </div>
  );
};

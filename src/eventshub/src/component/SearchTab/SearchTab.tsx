import {
  InstantSearch,
  Hits,
  Configure,
  Pagination,
} from 'react-instantsearch';
import { Autocomplete } from '../Autocomplete';
import { SearchItem } from '../SearchItem';
import searchClient from '../../utils/algoliaConfig';
import SearchFilter from '../SearchFilter/SearchFilter';

interface FilterCategory {
  name: string;
  options: string[];
}

const mockFilterData: FilterCategory[] = [
  {
    name: 'Category',
    options: ['Books', 'Electronics', 'Clothing', 'Home & Kitchen'],
  },
  {
    name: 'Tags',
    options: ['New Arrival', 'On Sale', 'Best Sellers'],
  },
];

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
        <div>
          <Autocomplete
            searchClient={searchClient}
            searchIndex={searchIndex}
            placeholder='Search by venues'
            detachedMediaQuery='none'
            openOnFocus
          />
          {mockFilterData.map((category) => {
            return <SearchFilter title={category.name} filterOptions={category.options} />;
          })}
        </div>
        <Hits hitComponent={SearchItem} />
        <Pagination />
      </InstantSearch>
    </div>
  );
};

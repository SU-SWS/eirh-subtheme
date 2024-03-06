import {
  InstantSearch,
  Hits,
  Configure,
  Pagination,
} from 'react-instantsearch';
import { Autocomplete } from '../Autocomplete';
import { SearchItem } from '../SearchItem';
import searchClient from '../../utilities/algoliaConfig';
import SearchFilter from '../SearchFilter/SearchFilter';
import { Grid } from '../Grid';
import { FlexBox } from '../FlexBox';

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
        <Grid gap='default' md={12}>
          <FlexBox direction='col' className='col-span-3'>
            <Autocomplete
              searchClient={searchClient}
              searchIndex={searchIndex}
              placeholder='Search by venues'
              detachedMediaQuery='none'
              openOnFocus
            />
            {mockFilterData.map((category) => {
              return (
                <SearchFilter
                  title={category.name}
                  filterOptions={category.options}
                />
              );
            })}
          </FlexBox>
          <FlexBox direction='col' className='col-span-9'>
            <Hits hitComponent={SearchItem} />
            <Pagination />
          </FlexBox>
        </Grid>
      </InstantSearch>
    </div>
  );
};

import {
  InstantSearch,
  Hits,
  Configure,
  Pagination,
} from 'react-instantsearch';
import { Autocomplete } from '../Autocomplete';
import VendorSearchItem from '../SearchItem/VendorSearchItem';
import VenueSearchItem from '../SearchItem/VenueSearchItem';
import PolicySearchItem from '../SearchItem/PolicySearchItem';
import searchClient from '../../utilities/algoliaConfig';
import SearchFilter from '../SearchFilter/SearchFilter';
import { Grid } from '../Grid';
import { FlexBox } from '../FlexBox';
import CustomHits from '../CustomHits/CustomHits';

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

interface SearchTabProps {
  searchIndex: 'venues' | 'vendors' | 'policies';
}

const algoliaIndexMap: Record<string, string> = {
  venues: 'SERENE ALL - appEb3LGlZS9OfNrK - Venues',
  vendors: 'SERENE ALL - appEb3LGlZS9OfNrK - Vendors',
  policies: 'SERENE ALL - appEb3LGlZS9OfNrK - Policies',
};

export const SearchTab = ({ searchIndex }: SearchTabProps) => {
  const algoliaIndexName = algoliaIndexMap[searchIndex];

  const getSearchItemComponent = () => {
    switch (searchIndex) {
      case 'venues':
        return VenueSearchItem;
      case 'vendors':
        return VendorSearchItem;
      case 'policies':
        return PolicySearchItem;
      default:
        return VenueSearchItem;
    }
  };

  const SearchItemComponent = getSearchItemComponent();

  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName={algoliaIndexName}
        routing
      >
        <Configure hitsPerPage={40} />
        <Grid gap='default' md={12}>
          <FlexBox direction='col' className='col-span-3'>
            <Autocomplete
              searchClient={searchClient}
              searchIndex={algoliaIndexName}
              placeholder={`Search by ${searchIndex}`}
              detachedMediaQuery='none'
              openOnFocus
            />
            {mockFilterData.map((category) => {
              return (
                <SearchFilter
                  key={category.name}
                  title={category.name}
                  filterOptions={category.options}
                />
              );
            })}
          </FlexBox>
          <FlexBox direction='col' className='col-span-9'>
            <CustomHits hitComponent={SearchItemComponent}  />
            <Pagination />
          </FlexBox>
        </Grid>
      </InstantSearch>
    </div>
  );
};

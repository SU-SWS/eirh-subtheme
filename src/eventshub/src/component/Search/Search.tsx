import {
  MapPinIcon,
  UserIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline';
import { cnb } from 'cnbuilder';
import VenueSearchItem from '../SearchItem/VenueSearchItem';
import VendorSearchItem from '../SearchItem/VendorSearchItem';
import PolicySearchItem from '../SearchItem/PolicySearchItem';
import { InstantSearch, Configure, Pagination } from 'react-instantsearch';
import { Autocomplete } from '../Autocomplete';
import SearchFilter from '../SearchFilter/SearchFilter';
import { Grid } from '../Grid';
import { FlexBox } from '../FlexBox';
import CustomHits from '../CustomHits/CustomHits';
import { FilterChips } from '../FilterChips/FilterChips';
import { useAppDispatch } from '../../redux/store';
import { useAppState, useFilters } from '../../hooks';
import algoliaClient from "../../utilities/algoliaConfig";
import LoadingIndicator from './LoadingIndicator';

/**
 * Search component.
 */
export const Search = () => {
  const dispatch = useAppDispatch();
  const { activeTab, setActiveTab, activeIndex } = useAppState();
  const searchClient = algoliaClient;
  searchClient.initIndex(activeIndex);

  const {
    filterData,
    selectedFilters,
    normailzeSelectedFiltersForAlgolia,
    getIndexFilterName,
  } = useFilters();


  const handleTabClick = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  const getSearchItemComponent = () => {
    switch (activeTab) {
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
      <button
        className={cnb(
          activeTab === 'venues' && 'er-border-b-3 er-border-digital-red',
          'er-rs-mr-3 er-rs-pb-1 er-rs-mb-2 er-sans er-inline-block'
        )}
        onClick={() => handleTabClick('venues')}
        aria-selected={activeTab === 'venues' ? 'true' : 'false'}
      >
        <MapPinIcon className='er-w-1em er-inline-block er-mr-3' />
        Venues
      </button>
      <button
        className={cnb(
          activeTab === 'vendors' && 'er-border-b-3 er-border-digital-red',
          'er-rs-mr-3 er-rs-pb-1 er-rs-mb-2 er-sans er-inline-block'
        )}
        onClick={() => handleTabClick('vendors')}
        aria-selected={activeTab === 'vendors' ? 'true' : 'false'}
      >
        <UserIcon className='er-w-1em er-inline-block er-mr-3' />
        Vendors
      </button>
      <button
        className={cnb(
          activeTab === 'policies' && 'er-border-b-3 er-border-digital-red',
          'er-rs-mr-3 er-rs-pb-1 er-rs-mb-2 er-sans er-inline-block'
        )}
        onClick={() => handleTabClick('policies')}
        aria-selected={activeTab === 'policies' ? 'true' : 'false'}
      >
        <ClipboardIcon className='er-w-1em er-inline-block er-mr-3' />
        Policies & Resources
      </button>

      {/* Search section */}
      <div>
        <InstantSearch
          searchClient={searchClient}
          indexName={activeIndex}
          routing
          future={{
            preserveSharedStateOnUnmount: true,
            persistHierarchicalRootCount: true,
          }}
          insights
        >
          <Configure
            hitsPerPage={25}
            facetFilters={[normailzeSelectedFiltersForAlgolia(selectedFilters, activeTab)]}
            facets={[getIndexFilterName(activeTab)]}
          />
          <Grid gap='default' md={12}>
            <FlexBox direction='col' className='er-col-span-3'>
              <Autocomplete
                searchClient={searchClient}
                searchIndex={activeIndex}
                placeholder={`Search by ${activeTab}`}
                filtersQuery={[normailzeSelectedFiltersForAlgolia(selectedFilters, activeTab)]}
                detachedMediaQuery='none'
                openOnFocus
              />
              <FilterChips />
              {filterData.map((category) => {
                return (
                  <SearchFilter
                    key={category.feature_group}
                    title={category.feature_group}
                    filterOptions={category.event_feature_group}
                  />
                );
              })}
            </FlexBox>
            <FlexBox direction='col' className='er-col-span-9'>
              <LoadingIndicator />
              <CustomHits hitComponent={SearchItemComponent} />
              <Pagination className="children:er-list-none children:er-flex children:er-justify-center children:children:er-m-10" />
            </FlexBox>
          </Grid>
        </InstantSearch>
      </div>
    </div>
  );
};

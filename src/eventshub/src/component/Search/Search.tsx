import { useSelector, useDispatch } from 'react-redux';
import {
  MapPinIcon,
  UserIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline';
import { cnb } from 'cnbuilder';
import { AppDispatch, RootState } from '../../redux/store';
import {
  selectActiveTab,
  setActiveTab,
} from '../../redux/slices/searchTypeSlice';
import { useEffect, useState } from 'react';
import { selectFilters } from '../../redux/slices/filtersSlice';
import {
  GroupedDataItem,
  algoliaFilterData,
} from '../../utilities/algoliaFiltersData';
import { getFilterData } from '../../utilities/getFilterData';
import VenueSearchItem from '../SearchItem/VenueSearchItem';
import VendorSearchItem from '../SearchItem/VendorSearchItem';
import PolicySearchItem from '../SearchItem/PolicySearchItem';
import { InstantSearch, Configure, Pagination } from 'react-instantsearch';
import { Autocomplete } from '../Autocomplete';
import searchClient from '../../utilities/algoliaConfig';
import SearchFilter from '../SearchFilter/SearchFilter';
import { Grid } from '../Grid';
import { FlexBox } from '../FlexBox';
import CustomHits from '../CustomHits/CustomHits';
import { FilterChips } from '../FilterChips/FilterChips';

const algoliaIndexMap: Record<string, string> = {
  venues: 'SERENE ALL - appEb3LGlZS9OfNrK - Venues',
  vendors: 'SERENE ALL - appEb3LGlZS9OfNrK - Vendors',
  policies: 'SERENE ALL - appEb3LGlZS9OfNrK - Policies',
};

const algoliaFacetMap: Record<string, string> = {
  venues: 'type_of_space_or_venue',
  vendors: 'service_type',
  policies: 'logistics_categories',
};

export const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeTab = useSelector((state: RootState) => selectActiveTab(state));

  const handleTabClick = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  const algoliaIndexName = algoliaIndexMap[activeTab];
  const [algoliaData, setAlgoliaData] = useState<GroupedDataItem[]>([]);
  const selectedFilters = useSelector(selectFilters);
  const [filterData, setFilterData] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await algoliaFilterData();
        console.log(data);
        setAlgoliaData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('RAW DATA:', selectedFilters);
    if (selectedFilters.length === 0) {
      setFilterData('');
      return;
    }

    const data = getFilterData(selectedFilters, activeTab);
    console.log('MODIFIED DATA:', data);
    console.log(
      'FILTERED DATA:',
      `(${data
        .map((filter) => `${algoliaFacetMap[activeTab]}:"${filter}"`)
        .join(' OR ')})`
    );
    setFilterData(
      `(${data
        .map((filter) => `${algoliaFacetMap[activeTab]}:"${filter}"`)
        .join(' OR ')})`
    );
  }, [selectedFilters, activeTab]);

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
      <div className='er-border-b er-rs-mb-2'>
        <button
          className={cnb(
            activeTab === 'venues' && 'er-border-b-3 er-border-digital-red',
            'er-rs-mr-2 er-pr-12 er-rs-pb-1 er-sans er-inline-block'
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
            'er-rs-mr-2 er-pr-12 er-rs-pb-1 er-sans er-inline-block'
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
            'er-rs-mr-2 er-pr-12 er-rs-pb-1 er-sans er-inline-block'
          )}
          onClick={() => handleTabClick('policies')}
          aria-selected={activeTab === 'policies' ? 'true' : 'false'}
        >
          <ClipboardIcon className='er-w-1em er-inline-block er-mr-3' />
          Policies
        </button>
      </div>

      {/* Search section */}
      <div>
        <InstantSearch
          searchClient={searchClient}
          indexName={algoliaIndexName}
          routing
        >
          <Configure hitsPerPage={25} filters={filterData} />
          <Grid gap='default' md={12}>
            <FlexBox direction='col' className='er-col-span-3'>
              <Autocomplete
                searchClient={searchClient}
                searchIndex={algoliaIndexName}
                placeholder={`Search by ${activeTab}`}
                filtersQuery={filterData}
                detachedMediaQuery='none'
                openOnFocus
              />
              <FilterChips />
              {algoliaData.map((category) => {
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
              <CustomHits
                hitComponent={SearchItemComponent}
                noResultsMessage={`We're sorry, but no results were found matching your search criteria. Please try again with different keywords or filters.`}
              />
              <Pagination className='children:er-list-none children:er-flex children:er-justify-center children:children:er-m-10' />
            </FlexBox>
          </Grid>
        </InstantSearch>
      </div>
    </div>
  );
};

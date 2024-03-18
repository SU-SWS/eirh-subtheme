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
      <button
        className={cnb(
          activeTab === 'venues' && 'border-b-3 border-digital-red',
          'rs-mr-3 rs-pb-1 rs-mb-2 sans inline-block'
        )}
        onClick={() => handleTabClick('venues')}
        aria-selected={activeTab === 'venues' ? 'true' : 'false'}
      >
        <MapPinIcon className='w-1em inline-block mr-3' />
        Venues
      </button>
      <button
        className={cnb(
          activeTab === 'vendors' && 'border-b-3 border-digital-red',
          'rs-mr-3 rs-pb-1 rs-mb-2 sans inline-block'
        )}
        onClick={() => handleTabClick('vendors')}
        aria-selected={activeTab === 'vendors' ? 'true' : 'false'}
      >
        <UserIcon className='w-1em inline-block mr-3' />
        Vendors
      </button>
      <button
        className={cnb(
          activeTab === 'policies' && 'border-b-3 border-digital-red',
          'rs-mr-3 rs-pb-1 rs-mb-2 sans inline-block'
        )}
        onClick={() => handleTabClick('policies')}
        aria-selected={activeTab === 'policies' ? 'true' : 'false'}
      >
        <ClipboardIcon className='w-1em inline-block mr-3' />
        Policies & Resources
      </button>

      {/* Search section */}
      <div>
        <InstantSearch
          searchClient={searchClient}
          indexName={algoliaIndexName}
          routing
        >
          <Configure hitsPerPage={25} filters={filterData} />
          <Grid gap='default' md={12}>
            <FlexBox direction='col' className='col-span-3'>
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
            <FlexBox direction='col' className='col-span-9'>
              <CustomHits hitComponent={SearchItemComponent} />
              <Pagination className="children:list-none children:flex children:justify-center children:children:m-10" />
            </FlexBox>
          </Grid>
        </InstantSearch>
      </div>
    </div>
  );
};

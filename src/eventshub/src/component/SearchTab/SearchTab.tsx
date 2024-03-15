import React, { useEffect, useState } from 'react';
import { InstantSearch, Configure, Pagination } from 'react-instantsearch';
import { Autocomplete } from '../Autocomplete';
import VendorSearchItem from '../SearchItem/VendorSearchItem';
import VenueSearchItem from '../SearchItem/VenueSearchItem';
import PolicySearchItem from '../SearchItem/PolicySearchItem';
import searchClient from '../../utilities/algoliaConfig';
import SearchFilter from '../SearchFilter/SearchFilter';
import { Grid } from '../Grid';
import { FlexBox } from '../FlexBox';
import CustomHits from '../CustomHits/CustomHits';
import {
  algoliaFilterData,
  GroupedDataItem,
} from '../../utilities/algoliaFiltersData';
import { selectFilters } from '../../redux/slices/filtersSlice';
import { useSelector } from 'react-redux';
import { getFilterData } from '../../utilities/getFilterData';

interface SearchTabProps {
  searchIndex: 'venues' | 'vendors' | 'policies';
}

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

export const SearchTab = ({ searchIndex }: SearchTabProps) => {
  const algoliaIndexName = algoliaIndexMap[searchIndex];
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

    const data = getFilterData(selectedFilters, searchIndex);
    console.log('MODIFIED DATA:', data);
    console.log(
      'FILTERED DATA:',
      `(${data
        .map((filter) => `${algoliaFacetMap[searchIndex]}:"${filter}"`)
        .join(' OR ')})`
    );
    setFilterData(
      `(${data
        .map((filter) => `${algoliaFacetMap[searchIndex]}:"${filter}"`)
        .join(' OR ')})`
    );
  }, [selectedFilters, searchIndex]);

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
        <Configure hitsPerPage={25} filters={filterData} />
        <Grid gap='default' md={12}>
          <FlexBox direction='col' className='col-span-3'>
            <Autocomplete
              searchClient={searchClient}
              searchIndex={algoliaIndexName}
              placeholder={`Search by ${searchIndex}`}
              filtersQuery={filterData}
              detachedMediaQuery='none'
              openOnFocus
            />
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
            <Pagination />
          </FlexBox>
        </Grid>
      </InstantSearch>
    </div>
  );
};

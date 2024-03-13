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
    const data = getFilterData(selectedFilters, searchIndex);
    if (data.length === 0) return;
    console.log('MODIFIED DATA:', data);
    console.log(
      'FILTERED DATA:',
      `(${data.map((filter) => `"${filter}"`).join(' AND ')})`
    );
    setFilterData(`(${data.map((filter) => `"${filter}"`).join(' AND ')})`);
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
        <Configure
          hitsPerPage={40}
          // filters={filterData}
        />
        <Grid gap='default' md={12}>
          <FlexBox direction='col' className='col-span-3'>
            <Autocomplete
              searchClient={searchClient}
              searchIndex={algoliaIndexName}
              placeholder={`Search by ${searchIndex}`}
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

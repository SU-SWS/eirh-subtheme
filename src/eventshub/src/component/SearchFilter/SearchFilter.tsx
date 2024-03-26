import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import {
  addFilter,
  removeFilter,
} from '../../redux/slices/filtersSlice';
import { Heading } from '../Typography';
import { FlexBox } from '../FlexBox';
import { EventFeatureGroupItem } from '../../utilities/algoliaFiltersData';
import { useFilters } from '../../hooks';
import { useInstantSearch } from 'react-instantsearch-core';

interface SearchFilterProps {
  title: string;
  filterOptions: EventFeatureGroupItem[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  title,
  filterOptions,
}) => {
  const dispatch = useAppDispatch();
  const { selectedFilters } = useFilters();
  const { uiState, setUiState, renderState, setIndexUiState} = useInstantSearch();

  console.log("Filter UI STEATE", uiState);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);

  const handleFilterToggle = (filter: EventFeatureGroupItem) => {

    if (selectedFilters.some((f) => f.event_feature === filter.event_feature)) {
      dispatch(removeFilter(filter));
    } else {
      dispatch(addFilter(filter));
    }
  };

  return (
    <section>
      <div>
        <button
          id='accordion-button'
          aria-expanded={isOpen}
          onClick={handleOpen}
          aria-controls='accordion-content'
        >
          <Heading as='h4' size='base'>{title}</Heading>
        </button>
      </div>
      <FlexBox
        direction='col'
        id='accordion-content'
        aria-labelledby='accordion-button'
        hidden={!isOpen}
        role='region'
        className={isOpen ? 'er-block' : 'er-hidden'}
      >
        {filterOptions.map((filter) => (
          <label
            key={filter.event_feature}
            className='er-flex er-items-center er-cursor-pointer er-text-19 hocus:er-underline'
          >
            <input
              type='checkbox'
              checked={selectedFilters.some(
                (f) => f.event_feature === filter.event_feature
              )}
              onChange={() => handleFilterToggle(filter)}
            />
            <span>{filter.event_feature}</span>
          </label>
        ))}
      </FlexBox>
    </section>
  );
};

export default SearchFilter;

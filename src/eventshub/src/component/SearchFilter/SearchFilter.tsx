import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  selectFilters,
  addFilter,
  removeFilter,
} from '../../redux/slices/filtersSlice';
import { Heading } from '../Typography';
import { FlexBox } from '../FlexBox';
import { EventFeatureGroupItem } from '../../utilities/algoliaFiltersData';

interface SearchFilterProps {
  title: string;
  filterOptions: EventFeatureGroupItem[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  title,
  filterOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);

  const selectedFilters = useSelector((state: RootState) =>
    selectFilters(state)
  );
  const dispatch = useDispatch();

  const handleFilterToggle = (filter: EventFeatureGroupItem) => {
    if (selectedFilters.some((f) => f.event_feature === filter.event_feature)) {
      console.log('REMOVE FILTER');
      dispatch(removeFilter(filter));
    } else {
      console.log('ADD FILTER');
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
          <Heading as='h3'>{title}</Heading>
        </button>
      </div>
      <FlexBox
        direction='col'
        id='accordion-content'
        aria-labelledby='accordion-button'
        hidden={!isOpen}
        role='region'
        className={isOpen ? 'block' : 'hidden'}
      >
        {filterOptions.map((filter) => (
          <label
            key={filter.event_feature}
            className='flex items-center cursor-pointer text-19 hocus:underline'
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

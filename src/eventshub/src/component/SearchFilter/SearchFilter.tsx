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

interface SearchFilterProps {
  title: string;
  filterOptions: string[];
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

  const handleFilterToggle = (filter: string) => {
    if (selectedFilters.includes(filter)) {
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
            key={filter}
            className='flex items-center cursor-pointer text-19 hocus:underline'
          >
            <input
              type='checkbox'
              value={filter}
              checked={selectedFilters.includes(filter)}
              onChange={() => handleFilterToggle(filter)}
            />
            <span>{filter}</span>
          </label>
        ))}
      </FlexBox>
    </section>
  );
};

export default SearchFilter;

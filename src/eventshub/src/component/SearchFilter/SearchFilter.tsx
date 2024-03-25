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
import { cnb } from 'cnbuilder';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

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
    <section className='er-border-b-3 er-py-45'>
      <div>
        <button
          id='accordion-button'
          aria-expanded={isOpen}
          onClick={handleOpen}
          aria-controls='accordion-content'
          className='er-flex er-direction-row er-justify-between er-w-full'
        >
          <Heading as='h4' size='base'>
            {title}
          </Heading>
          <ChevronDownIcon
            className={cnb('er-w-1em', isOpen && 'er-rotate-180')}
          />
        </button>
      </div>
      <FlexBox
        direction='col'
        id='accordion-content'
        aria-labelledby='accordion-button'
        hidden={!isOpen}
        role='region'
        className={cnb(isOpen ? 'er-block' : 'er-hidden', 'er-px-26')}
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
              className='er-block er-rounded er-border-2 er-border-black-50 focus:er-border-lagunita checked:er-text-lagunita checked:er-border-lagunita-light checked:hover:er-text-lagunita-dark checked:focus:er-text-lagunita-dark checked:er-hover:er-border-lagunita checked:focus:er-border-lagunita group-hover:er-bg-transparent focus:er-bg-transparent outline-none focus-visible:er-outline-none outline-none focus:er-ring-0 focus:er-ring-offset-0 checked:er-group-hover:er-text-lagunita-dark checked:focus:er-text-lagunita-dark checked:er-group-hover:er-bg-lagunita-dark checked:focus:er-bg-lagunita-dark disabled:er-border-black-40 disabled:er-pointer-events-none disabled:er-checked:bg-black-40 transition-colors w-20 h-20 indeterminate:!er-bg-lagunita indeterminate:!er-border-lagunita-light indeterminate:group-hover:!er-bg-lagunita-dark indeterminate:group-hover:!er-border-lagunita indeterminate:focus:!bg-lagunita-dark indeterminate:focus:!er-border-lagunita'
            />
            <span>{filter.event_feature}</span>
          </label>
        ))}
      </FlexBox>
    </section>
  );
};

export default SearchFilter;

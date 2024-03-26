import { useSelector, useDispatch } from 'react-redux';
import { Heading } from '../Typography';
import {
  clearFilters,
  removeFilter,
  selectFilters,
} from '../../redux/slices/filtersSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { EventFeatureGroupItem } from '../../utilities/algoliaFiltersData';
import { XMarkIcon} from '@heroicons/react/16/solid'
import { ClearRefinements } from 'react-instantsearch';

export const FilterChips = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFilters = useSelector((state: RootState) =>
    selectFilters(state)
  ); // Type the useSelector hook with RootState

  const removeEventFilter = (filter: EventFeatureGroupItem) => {
    dispatch(removeFilter(filter));
  };

  const clearEventFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div>
      <Heading as='h4' size='base'>Filter By</Heading>
      <div>
        {selectedFilters.map((filter, index) => (
          <button key={index} onClick={() => removeEventFilter(filter)}
          className="er-inline-block er-group hover:er-underline focus-visible:er-underline er-transition er-text-16 er-pt-7 er-pb-8 er-px-18 er-font-regular er-rounded-full er-shadow hover:er-shadow-md focus:er-shadow active:er-shadow er-no-underline er-underline-offset-2 er-leading-display er-bg-white hocus:er-bg-digital-blue-20 er-text-digital-blue hocus:er-text-digital-blue-dark er-border-2 er-border-digital-blue focus:er-ring-2 active:er-ring-2 focus:er-ring-digital-blue-40 active:er-ring-digital-blue-40 er-outline-none hocus:er-decoration-digital-blue hocus:er-decoration-1"
          >
            {filter.event_feature}
            <XMarkIcon className='er-w-1em er-inline-block er-ml-3' />
          </button>
        ))}
      </div>
      <div>
        <button onClick={clearEventFilters}>Clear all filters</button>
        <ClearRefinements />
      </div>
    </div>
  );
};

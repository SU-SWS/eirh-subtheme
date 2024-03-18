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
          className="inline-block group hover:underline focus-visible:underline transition text-16 pt-7 pb-8 px-18 font-regular rounded-full shadow hover:shadow-md focus:shadow active:shadow no-underline underline-offset-2 leading-display bg-white hocus:bg-digital-blue-20 text-digital-blue hocus:text-digital-blue-dark border-2 border-digital-blue focus:ring-2 active:ring-2 focus:ring-digital-blue-40 active:ring-digital-blue-40 outline-none hocus:decoration-digital-blue hocus:decoration-1"
          >
            {filter.event_feature}
            <XMarkIcon className='w-1em inline-block ml-3' />
          </button>
        ))}
      </div>
      <div>
        <button onClick={clearEventFilters}>Clear all filters</button>
      </div>
    </div>
  );
};

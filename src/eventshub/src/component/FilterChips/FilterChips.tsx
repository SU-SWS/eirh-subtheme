import { Heading } from '../Typography';
import {
  clearFilters,
  removeFilter,
} from '../../redux/slices/filtersSlice';
import { useAppDispatch,  } from '../../redux/store';
import { XMarkIcon} from '@heroicons/react/16/solid'
import { useFilters } from '../../hooks';

export const FilterChips = () => {
  const dispatch = useAppDispatch();
  const { selectedFilters} = useFilters();

  /**
   * Remove one filter from the list.
   */
  const removeEventFilter = (filter: string) => {
    dispatch(removeFilter(filter));
  };

  /**
   * Clear all the filters.
   */
  const clearEventFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div>
      <Heading as='h5'>Filter By</Heading>
      <div>
        {selectedFilters.map((key) => (
          <button key={key} onClick={() => removeEventFilter(key)}
          className="er-inline-block er-group hover:er-underline focus-visible:er-underline er-transition er-text-16 er-pt-7 er-pb-8 er-px-18 er-font-regular er-rounded-full er-shadow hover:er-shadow-md focus:er-shadow active:er-shadow er-no-underline er-underline-offset-2 er-leading-display er-bg-white hocus:er-bg-digital-blue-20 er-text-digital-blue hocus:er-text-digital-blue-dark er-border-2 er-border-digital-blue focus:er-ring-2 active:er-ring-2 focus:er-ring-digital-blue-40 active:er-ring-digital-blue-40 er-outline-none hocus:er-decoration-digital-blue hocus:er-decoration-1"
          >
            {key}
            <XMarkIcon className='er-w-1em er-inline-block er-ml-3' />
          </button>
        ))}
      </div>
      <div>
        {selectedFilters.length > 0 && (<button onClick={clearEventFilters}>Clear all filters</button>)}
      </div>
    </div>
  );
};

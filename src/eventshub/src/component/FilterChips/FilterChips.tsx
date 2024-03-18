import { useSelector, useDispatch } from 'react-redux';
import { Heading } from '../Typography';
import { clearFilters, removeFilter, selectFilters } from '../../redux/slices/filtersSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { EventFeatureGroupItem } from '../../utilities/algoliaFiltersData';

export const FilterChips = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFilters = useSelector((state: RootState) => selectFilters(state)); // Type the useSelector hook with RootState

  const removeEventFilter = (filter: EventFeatureGroupItem) => { 
    dispatch(removeFilter(filter));
  }

  const clearEventFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div>
      <Heading>Filer By</Heading>
      {selectedFilters.map((filter, index) => (
        <button key={index} onClick={() => removeEventFilter(filter)}>
          {filter.event_feature}
        </button>
      ))}
      <button onClick={clearEventFilters}>Clear all filters</button>
    </div>
  );
};

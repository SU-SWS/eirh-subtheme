import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  selectFilters,
  addFilter,
  removeFilter,
} from '../../redux/slices/filtersSlice';

interface SearchFilterProps {
  title: string;
  filterOptions: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  title,
  filterOptions,
}) => {
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
    <div>
      <h3>{title}</h3>
      {filterOptions.map((filter) => (
        <label key={filter}>
          <input
            type='checkbox'
            value={filter}
            checked={selectedFilters.includes(filter)}
            onChange={() => handleFilterToggle(filter)}
          />
          {filter}
        </label>
      ))}
    </div>
  );
};

export default SearchFilter;

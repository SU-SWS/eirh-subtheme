import { nanoid } from "nanoid";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setSortBy  } from "../../redux/slices/filtersSlice";

export const SortBy = () => {
  const id = nanoid();
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.filters);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = ['relevance', 'asc', 'desc'];
   // Check if the event value is in the options array.
    if (options.includes(event.target.value)) {
      dispatch(setSortBy(event.target.value as 'relevance' | 'asc' | 'desc'));
    }
  }

  return (
    <div>
      <label htmlFor={id}>Sort by: </label>
      <select id={id} onChange={handleChange} value={sortBy}>
        <option value='relevance'>Relevance</option>
        <option value='asc'>Name: A-Z</option>
        <option value='desc'>Name: Z-A</option>
      </select>
    </div>
  );
}

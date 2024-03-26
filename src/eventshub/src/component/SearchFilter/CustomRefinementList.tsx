import { useRefinementList } from 'react-instantsearch';
import { useAppState } from '../../hooks';
import { EventFeatureGroupItem } from '../../utilities/algoliaFiltersData';
import { useAppDispatch } from '../../redux/store';

export type CustomRefinementListProps = {
  attribute: string;
  title: string;
  options: EventFeatureGroupItem[];
};

const CustomRefinementList = ({ attribute, title, options }:CustomRefinementListProps) => {
  const { activeTab } = useAppState();
  const dispatch = useAppDispatch();
  const { refine } = useRefinementList({attribute, operator: 'or', limit: 100 });

  const isRefined = false;
  const itemCount = 0;

  const handleRefine = ({values, key} : {values:string[], key:string}) => {
    values.forEach((value) => {
      const ref = (value === 'Any/All') ? '-Any/All' : value;
      refine(ref);
    });
    dispatch({type: 'filters/addFilter', payload: { [activeTab]: values, event_feature: key }});
  }

  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {options.map((item) => (
          <li key={item.event_feature}>
            <label>
              <input
                type="checkbox"
                checked={isRefined}
                onChange={() => handleRefine({values: item[activeTab], key: item.event_feature})}
              />
              <span>{item.event_feature}</span>
              <span>({itemCount})</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CustomRefinementList;

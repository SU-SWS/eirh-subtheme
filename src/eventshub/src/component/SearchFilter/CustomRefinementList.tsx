import { useState } from 'react';
import { useRefinementList } from 'react-instantsearch';
import { useFilters } from '../../hooks';
import { useAppDispatch } from '../../redux/store';
import { Heading } from '../Typography';
import { FlexBox } from '../FlexBox';
import { nanoid } from 'nanoid';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { cnb } from 'cnbuilder';

export type CustomRefinementListProps = {
  attribute: string;
  title: string;
  options: { name: string, weight: number }[];
};

const CustomRefinementList = ({ attribute, title, options }:CustomRefinementListProps) => {

  const dispatch = useAppDispatch();
  useRefinementList({attribute, operator: 'or', limit: 100 });
  const buttonId = nanoid();
  const contentId = nanoid();
  const { selectedFilters } = useFilters();

  const handleRefine = (key:string) => {
    dispatch({type: 'filters/toggleFilter', payload: key});
  }

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <section className='er-border-b-3 er-py-45'>
      <div>
        <button
          id={buttonId}
          aria-expanded={isOpen}
          onClick={handleOpen}
          aria-controls={contentId}
          className='er-flex er-direction-row er-justify-between er-w-full'
        >
          <Heading as='h5' className="er-m-0">
            {title}
          </Heading>
          <ChevronDownIcon
            className={cnb('er-w-1em', isOpen && 'er-rotate-180')}
          />
        </button>
      </div>
      <FlexBox
        direction='col'
        id={contentId}
        aria-labelledby={buttonId}
        hidden={!isOpen}
        role='region'
        className={cnb(isOpen ? 'er-block' : 'er-hidden', 'er-px-26 er-pt-36')}
      >
        {options.map((item) => {
          const isRefined = selectedFilters.includes(item.name);
          const itemCount = 0; // TODO: Get the count from the UIState.
          return (
            <label
              key={item.name}
              className='er-mt-0 er-mb-26 last:er-mb-0 er-flex er-items-center er-cursor-pointer er-text-19 hocus:er-underline'
            >
              <input
                type='checkbox'
                checked={isRefined}
                onChange={() => handleRefine(item.name)}
                className='er-mr-10 er-block er-rounded er-border-2 er-border-black-50 focus:er-border-digital-blue checked:er-text-digital-blue checked:er-border-digital-blue-light checked:hover:er-text-digital-blue-dark checked:focus:er-text-digital-blue-dark checked:er-hover:er-border-digital-blue checked:focus:er-border-digital-blue group-hover:er-bg-transparent focus:er-bg-transparent outline-none focus-visible:er-outline-none outline-none focus:er-ring-0 focus:er-ring-offset-0 checked:er-group-hover:er-text-digital-blue-dark checked:focus:er-text-digital-blue-dark checked:er-group-hover:er-bg-digital-blue-dark checked:focus:er-bg-digital-blue-dark disabled:er-border-black-40 disabled:er-pointer-events-none disabled:checked:er-bg-black-40 er-transition-colors er-w-20 er-h-20'
              />
              <span>{item.name}</span>
              <span>({itemCount})</span>
            </label>
          )})}
      </FlexBox>
    </section>
  )
}

export default CustomRefinementList;

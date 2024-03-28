import React, { useState } from 'react';
import { Autocomplete } from '../Autocomplete';
import { FilterChips } from '../FilterChips';
import CustomRefinementList from '../SearchFilter/CustomRefinementList';
import { Heading } from '../Typography';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import type { SearchClient } from 'algoliasearch/lite';

interface MobileFilterMenuProps {
  searchClient: SearchClient;
  activeIndex: string;
  activeTab: string;
  groupedFilters: { [key: string]: { name: string; weight: number }[] };
  facetAttribute: string;
  className?: string;
}

const MobileFilterMenu: React.FC<MobileFilterMenuProps> = ({
  searchClient,
  activeIndex,
  activeTab,
  groupedFilters,
  facetAttribute,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const buttonId = 'accordion-button';
  const contentId = 'accordion-content';

  return (
    <div className={className}>
      {/* Accordion button */}
      <div>
        <button
          id={buttonId}
          aria-expanded={isOpen}
          onClick={handleOpen}
          aria-controls={contentId}
          className='er-flex er-direction-row er-justify-between er-w-full'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOpen();
            }
          }}
        >
          <Heading as='h4' className='er-m-0'>
            Filters
          </Heading>
          <ChevronDownIcon className='er-w-1em' />
        </button>
      </div>
      {/* Accordion items */}
      <div
        id={contentId}
        aria-hidden={!isOpen}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <Autocomplete
          searchClient={searchClient}
          searchIndex={activeIndex}
          placeholder={`Search by ${activeTab}`}
          detachedMediaQuery='none'
          openOnFocus
          debug={true}
        />
        <FilterChips />
        {
          // loop through grouped filters and render the custom refinement list.
          Object.keys(groupedFilters).map((group) => {
            return (
              <CustomRefinementList
                key={group}
                title={group}
                options={groupedFilters[group]}
                attribute={facetAttribute}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default MobileFilterMenu;

import { useState } from 'react';
import { SearchTab } from '../SearchTab';
import {
  MapPinIcon,
  UserIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline';
import { cnb } from 'cnbuilder';

export const Search = () => {
  const [activeTab, setActiveTab] = useState<string>('Venues');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <button
        className={cnb(
          activeTab === 'Venues' && 'border-b-3 border-digital-red',
          'rs-mr-3 rs-pb-1 rs-mb-2 sans inline-block'
        )}
        onClick={() => handleTabClick('Venues')}
        aria-selected={activeTab === 'Venues' ? 'true' : 'false'}
      >
        <MapPinIcon className='w-1em inline-block mr-3' />
        Venues
      </button>
      <button
        className={cnb(
          activeTab === 'Vendors' && 'border-b-3 border-digital-red',
          'rs-mr-3 rs-pb-1 rs-mb-2 sans inline-block'
        )}
        onClick={() => handleTabClick('Vendors')}
        aria-selected={activeTab === 'Vendors' ? 'true' : 'false'}
      >
        <UserIcon className='w-1em inline-block mr-3' />
        Vendors
      </button>
      <button
        className={cnb(
          activeTab === 'Policies' && 'border-b-3 border-digital-red',
          'rs-mr-3 rs-pb-1 rs-mb-2 sans inline-block'
        )}
        onClick={() => handleTabClick('Policies')}
        aria-selected={activeTab === 'Policies' ? 'true' : 'false'}
      >
        <ClipboardIcon className='w-1em inline-block mr-3' />
        Policies & Resources
      </button>

      {activeTab === 'Venues' && <SearchTab searchIndex='venues' />}
      {activeTab === 'Vendors' && <SearchTab searchIndex='vendors' />}
      {activeTab === 'Policies' && <SearchTab searchIndex='policies' />}
    </div>
  );
};

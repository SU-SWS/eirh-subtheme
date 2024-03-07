import React, { useState } from 'react';
import { SearchTab } from '../SearchTab';

export const Search = () => {
  const [activeTab, setActiveTab] = useState<string>('Venues');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <button
        onClick={() => handleTabClick('Venues')}
        aria-selected={activeTab === 'Venues' ? 'true' : 'false'}
      >
        Venues
      </button>
      <button
        onClick={() => handleTabClick('Vendors')}
        aria-selected={activeTab === 'Vendors' ? 'true' : 'false'}
      >
        Vendors
      </button>
      <button
        onClick={() => handleTabClick('Policies')}
        aria-selected={activeTab === 'Policies' ? 'true' : 'false'}
      >
        Policies & Resources
      </button>

      {activeTab === 'Venues' && (
        <SearchTab searchIndex='venues' />
      )}
      {activeTab === 'Vendors' && (
        <SearchTab searchIndex='vendors' />
      )}
      {activeTab === 'Policies' && (
        <SearchTab searchIndex='policies' />
      )}
    </div>
  );
};

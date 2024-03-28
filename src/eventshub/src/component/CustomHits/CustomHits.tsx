import React from 'react';
import { useHits, UseHitsProps } from 'react-instantsearch';
import { Hit as AlgoliaHit } from 'instantsearch.js/es/types';

interface CustomHitsProps extends UseHitsProps {
  hitComponent: React.ComponentType<{ hit: AlgoliaHit }>;
  noResultsMessage?: string; // Optional prop for custom no results message
}

export const CustomHits: React.FC<CustomHitsProps> = ({
  hitComponent: HitComponent,
  noResultsMessage = 'No results found.', // Default message if not provided
  ...props
}) => {
  const { hits } = useHits(props);

  if (hits.length === 0) {
    return <div>{noResultsMessage}</div>;
  }

  return (
    <ul className='er-list-none er-p-0'>
      {hits.map((hit) => (
        <li key={hit.objectID}>
          <HitComponent hit={hit} />
        </li>
      ))}
    </ul>
  );
};

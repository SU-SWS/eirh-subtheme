import React from 'react';
import { useHits, UseHitsProps } from 'react-instantsearch';
import { Hit as AlgoliaHit } from 'instantsearch.js/es/types';

interface CustomHitsProps extends UseHitsProps {
  hitComponent: React.ComponentType<{ hit: AlgoliaHit }>;
}

const CustomHits: React.FC<CustomHitsProps> = ({
  hitComponent: HitComponent,
  ...props
}) => {
  const { hits } = useHits(props);

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

export default CustomHits;

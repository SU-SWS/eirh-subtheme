import { Hit as AlgoliaHit } from 'instantsearch.js/es/types';

type SearchItemProps = {
  hit: AlgoliaHit<{
    name?: string;
    venue_name?: string;
  }>;
};

export function SearchItem({ hit }: SearchItemProps) {
  return (
    <article>
      {hit.venue_name && <h3>{hit.venue_name}</h3>}
      {hit.name && <h3>{hit.name}</h3>}
    </article>
  );
}

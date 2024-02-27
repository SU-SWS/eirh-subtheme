import { Hit as AlgoliaHit } from 'instantsearch.js/es/types';

export function SearchItem({ hit }: AlgoliaHit) {
  return (
    <article>
      {hit.venue_name && <h3>{hit.venue_name}</h3>}
      {hit.name && <h3>{hit.name}</h3>}
      {hit?.descrption && <p>{hit.descrption}</p>}
      <p>{hit.type}</p>
      <p>{hit.status}</p>
    </article>
  );
}

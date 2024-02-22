import { Hit as AlgoliaHit } from 'instantsearch.js/es/types';

export function SearchItem({ hit }: AlgoliaHit) {
  return (
    <article>
      <h1>{hit.venue_name}</h1>
      {hit?.descrption && <p>{hit.descrption}</p>}
      <p>{hit.type}</p>
      <p>{hit.status}</p>
    </article>
  );
}

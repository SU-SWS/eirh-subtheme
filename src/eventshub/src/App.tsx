import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Configure,
  Pagination,
} from 'react-instantsearch';
import { Hit as AlgoliaHit } from 'instantsearch.js/es/types';
import { Autocomplete } from './component/Autocomplete';

function Hit({ hit }: AlgoliaHit) {
  return (
    <article>
      <h1>{hit.name}</h1>
      {hit?.descrption && <p>{hit.descrption}</p>}
      <p>{hit.type}</p>
      <p>{hit.status}</p>
    </article>
  );
}

function App() {
  const appId = process.env.ALGOLIA_APP_ID || '';
  const apiKey = process.env.ALGOLIA_API_KEY || '';
  const searchClient = algoliasearch(appId, apiKey);
  console.log('APPID:', appId);
  console.log('APIKEY:', apiKey);

  return (
    <div>
      <h2>Vite + React</h2>
      <InstantSearch
        searchClient={searchClient}
        indexName='test_SERENE'
        routing
      >
        <Configure hitsPerPage={40} />
        <Autocomplete
          placeholder='Search by venues'
          detachedMediaQuery='none'
          openOnFocus
        />
        <Hits hitComponent={Hit} />
        <Pagination />
      </InstantSearch>
    </div>
  );
}

export default App;

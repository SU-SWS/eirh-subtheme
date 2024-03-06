import algoliasearch from 'algoliasearch';

const appId = import.meta.env.VITE_ALGOLIA_APP_ID || '';
const apiKey = import.meta.env.VITE_ALGOLIA_API_KEY || '';

const searchClient = algoliasearch(appId, apiKey);

export default searchClient;

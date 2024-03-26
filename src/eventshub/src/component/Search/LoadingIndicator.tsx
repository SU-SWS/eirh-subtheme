import { useInstantSearch } from 'react-instantsearch-core';

export default function LoadingIndicator() {
  const { status } = useInstantSearch();

  if (status === 'stalled') {
    return <p>Loading search results</p>;
  }

  return null;
}

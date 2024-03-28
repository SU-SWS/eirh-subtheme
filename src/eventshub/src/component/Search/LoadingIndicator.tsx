import { useInstantSearch } from 'react-instantsearch-core';
import Skeleton from 'react-loading-skeleton';

export default function LoadingIndicator() {
  const { status } = useInstantSearch();

  if (status === 'stalled' || status === 'loading') {
    return <Skeleton count={25} height={200} className='er-mb-25' />;
  }

  return null;
}

import Skeleton from 'react-loading-skeleton';
import { Search } from './component/Search';
import 'react-loading-skeleton/dist/skeleton.css';
import { FlexBox } from './component/FlexBox';
import { Grid } from './component/Grid';
import { Heading } from './component/Typography';
import { useAppState, useFilters} from './hooks';

function App() {
  const { isLoading, isReady, isError }  = useAppState();
  const { isLoading: isLoadingFilter, isReady: isReadyFilter, isError: isErrorFilter } = useFilters();

  // If there was an error loading filters, show an error message.
  if (isErrorFilter || isError) {
    return (
      <div className='er-cc er-bg-digital-red'>
        <Heading as='h1' className='er-text-white er-rs-p-8'>Error loading application</Heading>
      </div>
    );
  }

  // If filters are not loaded, show a loading skeleton.
  if (isLoadingFilter || isLoading) {
    return (
      <Grid gap='default' md={12} className='er-cc'>
        <FlexBox direction='col' className='er-col-span-3'>
          <Skeleton count={10} className='er-h-40' containerClassName='er-flex-1' />
        </FlexBox>
        <FlexBox direction='col' className='er-col-span-9'>
          <Skeleton count={10} className='er-h-100' containerClassName='er-flex-1'/>
        </FlexBox>
      </Grid>
    );
  }

  // If filters are loaded and the app is ready, show the search component.
  if (isReady && isReadyFilter) {
    return <Search />;
  }

  // If we get here, something went wrong.
  return (<p>Something went wrong.</p>);

}

export default App;

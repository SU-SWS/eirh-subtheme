import {
  MapPinIcon,
  UserIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline';
import { cnb } from 'cnbuilder';
import VenueSearchItem from '../SearchItem/VenueSearchItem';
import VendorSearchItem from '../SearchItem/VendorSearchItem';
import PolicySearchItem from '../SearchItem/PolicySearchItem';
import { InstantSearch, Configure, Pagination } from 'react-instantsearch';
import { Autocomplete } from '../Autocomplete';
import { Grid } from '../Grid';
import { FlexBox } from '../FlexBox';
import CustomHits from '../CustomHits/CustomHits';
import { FilterChips } from '../FilterChips/FilterChips';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useAppState, useFilters } from '../../hooks';
import algoliaClient from '../../utilities/algoliaClient';
import LoadingIndicator from './LoadingIndicator';
import { useEffect, useRef } from 'react';
import CustomRefinementList from '../SearchFilter/CustomRefinementList';
import { history } from 'instantsearch.js/es/lib/routers';
import Middleware from './Middleware';
import type { UiState } from 'instantsearch.js';
import MobileFilterMenu from './MobileFilterMenu';

export type RouteState = Partial<{
  tab: string;
  filters: string[];
  q: string;
  page: number;
  sortBy: string;
}>;


/**
 * Search component.
 */
export const Search = () => {
  const dispatch = useAppDispatch();
  const { activeTab, setActiveTab, activeIndex } = useAppState();
  const { groupedFilters, getIndexFilterName } = useFilters();

  // ------------------------------------------------------------------------
  // WARNING: UGLY HACK.
  // Hack to keep the store ref up to date and to be able to use in the anonymous function
  // we pass in the router object to algolia instantsearch.
  // This gets around the scope/closure issue with the router object.
  const filtersStore = useAppSelector((state) => state.filters);
  const filtersStoreRef = useRef(filtersStore);
  useEffect(() => {
    filtersStoreRef.current = filtersStore;
  }, [filtersStore]);

  const appStore = useAppSelector((state) => state.app);
  const appStoreRef = useRef(appStore);
  useEffect(() => {
    appStoreRef.current = appStore;
  }, [appStore]);
  // End of ugly hack.
  // ------------------------------------------------------------------------

  // Change the index when the active index changes.
  useEffect(() => {
    const swapIndex = async () => {
      await algoliaClient.initIndex(activeIndex);
    }
    swapIndex();
  }, [activeIndex, dispatch]);

  // Do stuff on tab click.
  const handleTabClick = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  // What to render.
  const getSearchItemComponent = () => {
    switch (activeTab) {
      case 'venues':
        return VenueSearchItem;
      case 'vendors':
        return VendorSearchItem;
      case 'policies':
        return PolicySearchItem;
      default:
        return VenueSearchItem;
    }
  };
  const SearchItemComponent = getSearchItemComponent();

  // The field name of the facet attribute on the current tab.
  const facetAttribute = getIndexFilterName(activeTab);

  // Routing object to handle router URLs.
  const routing = {
    router: history(),
    stateMapping: {
      stateToRoute(uiState:UiState) {
        // Get the first key of uiState
        const indexUiState = uiState[Object.keys(uiState)[0]];
        const { selectedFilters } = filtersStoreRef.current;
        const { tab } = appStoreRef.current;
        return {
          // Search box.
          q: indexUiState?.query,
          // Filter facets
          filters: selectedFilters,
          // Pager.
          page: indexUiState?.page,
          // Active tab.
          tab: tab,
          // Sort order.
          // sortBy: TBD
        } as unknown as UiState;
      },
      routeToState(routeState:RouteState) {
        const { index, field } = appStoreRef.current;

        // Set the active tab.
        if (routeState?.tab) {
          dispatch(setActiveTab(activeTab));
        }

        // Set the active filters.
        if (routeState?.filters) {
          dispatch({ type: 'filters/setFilters', payload: routeState.filters });
        }

        return {
          [index]: {
            query: routeState?.q,
            refinementList: {
              [field]: routeState?.filters,
            },
            page: routeState?.page ?? 1,
            sortBy: routeState?.sortBy,
          },
        } as unknown as UiState;

      },
    },
  };

  return (
    <div>
      <div className='er-border-b er-rs-mb-2'>
        <button
          className={cnb(
            activeTab === 'venues' && 'er-border-b-3 er-border-digital-red',
            'er-rs-mr-2 er-pr-12 er-rs-pb-1 er-sans er-inline-block'
          )}
          onClick={() => handleTabClick('venues')}
          aria-selected={activeTab === 'venues' ? 'true' : 'false'}
        >
          <MapPinIcon className='er-w-1em er-inline-block er-mr-3' />
          Venues
        </button>
        <button
          className={cnb(
            activeTab === 'vendors' && 'er-border-b-3 er-border-digital-red',
            'er-rs-mr-2 er-pr-12 er-rs-pb-1 er-sans er-inline-block'
          )}
          onClick={() => handleTabClick('vendors')}
          aria-selected={activeTab === 'vendors' ? 'true' : 'false'}
        >
          <UserIcon className='er-w-1em er-inline-block er-mr-3' />
          Vendors
        </button>
        <button
          className={cnb(
            activeTab === 'policies' && 'er-border-b-3 er-border-digital-red',
            'er-rs-mr-2 er-pr-12 er-rs-pb-1 er-sans er-inline-block'
          )}
          onClick={() => handleTabClick('policies')}
          aria-selected={activeTab === 'policies' ? 'true' : 'false'}
        >
          <ClipboardIcon className='er-w-1em er-inline-block er-mr-3' />
          Policies
        </button>
      </div>

      {/* Search section */}
      <div>
        <InstantSearch
          searchClient={algoliaClient}
          indexName={activeIndex}
          routing={routing}
          future={{
            preserveSharedStateOnUnmount: false,
            persistHierarchicalRootCount: true,
          }}
          insights
        >
          <Configure hitsPerPage={25} analytics={true} />
          <Middleware />
          <Grid gap='default' md={12}>
            <MobileFilterMenu
              searchClient={algoliaClient}
              activeIndex={activeIndex}
              activeTab={activeTab}
              groupedFilters={groupedFilters}
              facetAttribute={facetAttribute}
              className="md:er-hidden"
            />
            <FlexBox
              direction='col'
              className='er-hidden md:er-block md:er-col-span-3'
            >
              <Autocomplete
                searchClient={algoliaClient}
                searchIndex={activeIndex}
                placeholder={`Search by ${activeTab}`}
                detachedMediaQuery='none'
                openOnFocus
              />
              <FilterChips />
              {
                // loop through grouped filters and render the custom refinement list.
                Object.keys(groupedFilters).map((group) => {
                  return (
                    <CustomRefinementList
                      key={group}
                      title={group}
                      options={groupedFilters[group]}
                      attribute={facetAttribute}
                    />
                  );
                })
              }
            </FlexBox>
            <FlexBox direction='col' className='er-col-span-9'>
              <LoadingIndicator />
              <CustomHits
                hitComponent={SearchItemComponent}
                noResultsMessage={`We're sorry, but no results were found matching your search criteria. Please try again with different keywords or filters.`}
              />
              <Pagination className='children:er-list-none children:er-flex children:er-justify-center children:children:er-m-10' />
            </FlexBox>
          </Grid>
        </InstantSearch>
      </div>
    </div>
  );
};

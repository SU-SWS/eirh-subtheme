import { EventFeatureGroupItem } from './algoliaFiltersData';


export const getFilterData = (selectedFilters: EventFeatureGroupItem[], dataType: 'vendors' | 'venues' | 'policies'): string[] => {
  let dataArray: string[] = [];

  selectedFilters.forEach((filter) => {
    switch (dataType) {
      case 'vendors':
        dataArray = dataArray.concat(filter.vendors);
        break;
      case 'venues':
        dataArray = dataArray.concat(filter.venues);
        break;
      case 'policies':
        dataArray = dataArray.concat(filter.policies);
        break;
      default:
        break;
    }
  });

  dataArray = Array.from(new Set(dataArray));

  return dataArray;
};

import { SearchIndex } from 'algoliasearch';
import searchClient from './algoliaConfig'; 

export interface AlgoliaHit {
  objectID: string;
  name: string;
  description: string;
}

const index: SearchIndex = searchClient.initIndex('SERENE ALL - appEb3LGlZS9OfNrK - Relationships');

export const fetchAlgoliaData = async (): Promise<AlgoliaHit[]> => {
  try {
    const { hits } = await index.search<AlgoliaHit>('', { hitsPerPage: 1000 });
    return hits;
  } catch (error) {
    console.error('Error fetching data from Algolia:', error);
    return [];
  }
};

export interface DataItem {
  event_feature: string;
  feature_group: string;
  'policies:_logistics_categories_column': string[];
  'vendors:_service_type': string[];
  'venues:_space_type': string[];
  weight: number;
}

export interface EventFeatureGroupItem {
  event_feature: string;
  venues: string[];
  vendors: string[];
  policies: string[];
  weight: number,
}

export interface GroupedDataItem {
  feature_group: string;
  event_feature_group: EventFeatureGroupItem[];
}

export const restructureData = (data: DataItem[]): GroupedDataItem[] => {
  const uniqueFeatureGroups: string[] = Array.from(new Set(data.map(item => item.feature_group)));

  return uniqueFeatureGroups.map((group) => {
    const itemsInGroup: DataItem[] = data.filter(item => item.feature_group === group);

    const eventFeatureGroup: EventFeatureGroupItem[] = itemsInGroup.map(item => ({
      event_feature: item.event_feature,
      venues: item['venues:_space_type'],
      vendors: item['vendors:_service_type'],
      policies: item['policies:_logistics_categories_column'],
      weight: item.weight
    }));

    eventFeatureGroup.sort((a, b) => a.weight - b.weight);

    return {
      feature_group: group,
      event_feature_group: eventFeatureGroup,
    };
  });
}

export const algoliaFilterData = async (): Promise<GroupedDataItem[]> => {
  const algoliaData = await fetchAlgoliaData();
  const filterData = restructureData(algoliaData as unknown as DataItem[]);
  return filterData;
};
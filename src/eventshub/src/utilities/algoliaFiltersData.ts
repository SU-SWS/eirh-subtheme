export interface AlgoliaHit {
  objectID: string;
  name: string;
  description: string;
}

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
  weight: number;
}

export interface GroupedDataItem {
  feature_group: string;
  event_feature_group: EventFeatureGroupItem[];
}

export const restructureData = (data: DataItem[]): GroupedDataItem[] => {
  let uniqueFeatureGroups: string[] = Array.from(
    new Set(data.map((item) => item.feature_group))
  );

  // Remove the All group
  const index = uniqueFeatureGroups.indexOf('All');
  if (index > -1) {
    uniqueFeatureGroups.splice(index, 1);
  }
  // Remove any undefined values from the array
  uniqueFeatureGroups = uniqueFeatureGroups.filter((group) => group !== undefined);

  // Loop through each of the groups and build the data structure
  return uniqueFeatureGroups.map((group) => {
    const itemsInGroup: DataItem[] = data.filter(
      (item) => item.feature_group === group
    );

    const eventFeatureGroup: EventFeatureGroupItem[] = itemsInGroup.map(
      (item) => ({
        event_feature: item.event_feature,
        venues: item['venues:_space_type'],
        vendors: item['vendors:_service_type'],
        policies: item['policies:_logistics_categories_column'],
        weight: item.weight,
      })
    );

    eventFeatureGroup.sort((a, b) => a.weight - b.weight);

    return {
      feature_group: group,
      event_feature_group: eventFeatureGroup,
    };
  });
};

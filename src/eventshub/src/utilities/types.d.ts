export type AlgoliaHit = {
  objectID: string;
  id: string;
  name: string;
  _tags?: string[];
}

export type AlgoliaFilterItem = {
  event_feature: string;
  feature_group: string;
  'policies:_logistics_categories_column': string[];
  'vendors:_service_type': string[];
  'venues:_space_type': string[];
  weight: number;
}

export type FormattedFilterItem = {
  [key: string]:
  {
    vendors: string[],
    venues: string[],
    policies: string[]
  }
}

export type AlgoliaVenueItem = AlgoliaHit & {
  space_name: string;
  venue_name: string;
  short_description: string
  address: string;
  type_of_space_or_venue: string[];
  image:
    {
      filename: string;
      height: number;
      id: string;
      size: number;
      thumbnails: {
        full: {
          height: number;
          url: string;
          width: number;
        },
        large: {
          height: number;
          url: string;
          width: number;
        },
        small: {
          height: number;
          url: string;
          width: number;
        }
      },
      type: string;
      url: string;
      width: number;
    }[];
  max_capacity: string;
  url_for_space_or_venue: string;
  venue: string[];
  venue_location: string;
}

export type AlgoliaVendorItem = AlgoliaHit & {
  business_address: string;
  contact_email: string;
  current_stanford_supplier: string;
  inquiry_form_or_contact: string;
  service_type: string[];
  url: string;
  vendor: string[];
  'vendor/unit_name': string;
}

export type AlgoliaPolicyItem = AlgoliaHit & {
  logistics_categories: string[];
  policy: string[];
  policy_name: string;
  policy_or_guideline_link: string;
  type: string[];
}

export type AppTabs = 'venues' | 'vendors' | 'policies';

export type SimpleFilter = { name: string, weight: number };

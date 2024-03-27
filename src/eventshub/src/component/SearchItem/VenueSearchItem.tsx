import { Hit as AlgoliaHit } from 'instantsearch.js/es/types';
import Cta from '../Cta/Cta';
import { Heading, Paragraph } from '../Typography';
import TypeList from './TypeList';
import { FlexBox } from '../FlexBox';
import { Grid } from '../Grid';
import { trimText } from '../../utilities/trimText';

interface AirtableImageData {
  filename: string;
  height: number;
  id: string;
  size: number;
  thumbnails: {
    full: { height: number; url: string; width: number };
    large: { height: number; url: string; width: number };
    small: { height: number; url: string; width: number };
  };
  type: string;
  url: string;
  width: number;
}

type VenueSearchItemProps = {
  hit: AlgoliaHit<{
    image?: AirtableImageData[];
    venue_name?: string;
    space_name?: string;
    type_of_space_or_venue?: string[];
    short_description?: string;
    url_for_space_or_venue?: string;
    venue_location?: string;
    max_capacity?: string;
    address?: string;
  }>;
};

const VenueSearchItem = ({ hit }: VenueSearchItemProps) => {
  const venueDescription =
    hit.short_description && trimText(hit.short_description, 100);
  const venueImage =
    hit.image && hit.image.length > 0
      ? hit.image[0].url
      : 'https://images.unsplash.com/photo-1508302882073-8af6be4c6688?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <Grid
      as='article'
      md={12}
      gap='default'
      className='er-border-b er-rs-mt-2 er-rs-pb-1'
    >
      <div className='er-col-span-2'>
        <div className='er-aspect-w-1 er-aspect-h-1 er-relative er-overflow-hidden'>
          <img
            className='er-absolute er-h-full er-w-full er-object-cover'
            src={venueImage}
            alt={hit.space_name}
          />
        </div>
      </div>
      <FlexBox direction='col' className='er-col-span-9 last:children:er-mb-0'>
        <FlexBox direction='row' justifyContent='between'>
          <Heading as='h3' size={1} className='er-m-0'>
            {hit.space_name}
          </Heading>
          <Paragraph size='base' className='er-m-0'>
            {hit.venue_location}
          </Paragraph>
        </FlexBox>
        {(hit.venue_name && hit.space_name !== hit.venue_name) && <Paragraph className='er-uppercase er-type-0 er-text-black-80'>{hit.venue_name}</Paragraph>}
        {hit.type_of_space_or_venue && (
          <TypeList items={hit.type_of_space_or_venue} />
        )}
        {hit.short_description && (
          <Paragraph size='base'>{venueDescription}</Paragraph>
        )}
        {hit.max_capacity && (
          <Paragraph size='base'>Max Capacity: {hit.max_capacity}</Paragraph>
        )}

        {hit.address && <Paragraph size='base'>{hit.address}</Paragraph>}
        {hit.url_for_space_or_venue && (
          <Cta href={hit.url_for_space_or_venue} extIcon>
            Website
          </Cta>
        )}
      </FlexBox>
    </Grid>
  );
};

export default VenueSearchItem;

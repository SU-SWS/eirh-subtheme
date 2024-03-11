import { Hit as AlgoliaHit } from 'instantsearch.js/es/types';
import Cta from '../Cta/Cta';
import { Heading, Paragraph } from '../Typography';
import TypeList from './TypeList';
import { FlexBox } from '../FlexBox';
import { Grid } from '../Grid';

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
    type_of_space_or_venue?: string[];
    short_description?: string;
    url_for_space_or_venue?: string;
  }>;
};

const VenueSearchItem = ({ hit }: VenueSearchItemProps) => {
  return (
    <Grid as='article' md={12} gap='default'>
      {hit.image && hit.image.length > 0 ? (
        <div className='col-span-2'>
          <div className='aspect-w-1 aspect-h-1 relative overflow-hidden'>
            <img
              className='absolute h-full w-full object-cover'
              src={hit.image[0].url}
              alt={hit.venue_name}
            />
          </div>
        </div>
      ) : null}
      <FlexBox direction='col' className='col-span-9'>
        {hit.venue_name && <Heading as='h3'>{hit.venue_name}</Heading>}
        {hit.type_of_space_or_venue && (
          <TypeList items={hit.type_of_space_or_venue} />
        )}
        {hit.short_description && (
          <Paragraph>{hit.short_description}</Paragraph>
        )}
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

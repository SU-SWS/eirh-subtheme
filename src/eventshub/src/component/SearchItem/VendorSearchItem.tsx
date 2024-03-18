import { Hit as AlgoliaHit } from 'instantsearch.js/es/types'; 
import Cta from '../Cta/Cta';
import { Heading, Paragraph } from '../Typography';
import TypeList from './TypeList';

type VendorSearchItemProps = {
  hit: AlgoliaHit<{
    name?: string;
    service_type?: string[];
    short_description?: string;
    url?: string;
    contact_email?: string;
  }>;
};

const VendorSearchItem = ({ hit }: VendorSearchItemProps) => {
  return (
    <article>
      {hit.name && <Heading as='h3'>{hit.name}</Heading>}
      {hit.service_type && <TypeList items={hit.service_type} />}
      {hit.short_description && <Paragraph>{hit.short_description}</Paragraph>}
      {hit.contact_email && <Cta href={hit.contact_email}>Contact</Cta>}
      {hit.url && <Cta href={hit.url} extIcon>Website</Cta>}
    </article>
  );
}

export default VendorSearchItem
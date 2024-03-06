import { Hit as AlgoliaHit } from 'instantsearch.js/es/types'; 
import Cta from '../Cta/Cta';

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

type SearchItemProps = {
  hit: AlgoliaHit<{
    image?: AirtableImageData[];
    name?: string;
    venue_name?: string;
    type_of_space_or_venue?: string[];
    short_description?: string;
    url_for_space_or_venue?: string;
  }>;
};

interface TypeListProps {
  items: string[];
}

const TypeList: React.FC<TypeListProps> = ({ items }) => {
  return (
    <p>{items.join(', ')}</p>
  );
};

export function SearchItem({ hit }: SearchItemProps) {
  return (
    <article>
      {hit.image && hit.image.length > 0 ? <img src={hit.image[0].url} alt={hit.venue_name} /> : null}
      {hit.venue_name || hit.name && <h3>{hit.venue_name || hit.name}</h3>}
      {hit.type_of_space_or_venue && <TypeList items={hit.type_of_space_or_venue} />}
      {hit.short_description && <p>{hit.short_description}</p>}
      {hit.url_for_space_or_venue && <Cta href={hit.url_for_space_or_venue} extIcon>Website</Cta>}
    </article>
  );
}

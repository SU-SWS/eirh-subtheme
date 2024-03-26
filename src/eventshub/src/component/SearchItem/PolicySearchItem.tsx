import { Hit as AlgoliaHit } from 'instantsearch.js/es/types';
import Cta from '../Cta/Cta';
import { Heading } from '../Typography';
import TypeList from './TypeList';

type PolicySearchItemProps = {
  hit: AlgoliaHit<{
    policy_name?: string;
    logistics_categories?: string[];
    policy_or_guide_link?: string;
  }>;
};

const PolicySearchItem = ({ hit }: PolicySearchItemProps) => {
  return (
    <article>
      {hit.policy_name && <Heading as='h3'>{hit.policy_name}</Heading>}
      {hit.logistics_categories && (
        <TypeList items={hit.logistics_categories} />
      )}
      {hit.policy_or_guide_link && (
        <Cta href={hit.policy_or_guide_link} extIcon>
          Website
        </Cta>
      )}
    </article>
  );
};

export default PolicySearchItem;

import { Hit as AlgoliaHit } from 'instantsearch.js/es/types';
import Cta from '../Cta/Cta';
import { Heading, Paragraph } from '../Typography';
import TypeList from './TypeList';
import { FlexBox } from '../FlexBox';

type PolicySearchItemProps = {
  hit: AlgoliaHit<{
    policy_name?: string;
    logistics_categories?: string[];
    policy_or_guideline_link?: string;
    type?: string;
  }>;
};

const PolicySearchItem = ({ hit }: PolicySearchItemProps) => {
  return (
    <article className='er-border-b er-rs-mt-2 er-rs-pb-1'>
      <FlexBox direction='row' justifyContent='between'>
        {hit.policy_name && (
          <Heading as='h3' size={1} className='er-m-0'>
            {hit.policy_name}
          </Heading>
        )}
        <Paragraph size='base' className='er-m-0'>
          {hit.type}
        </Paragraph>
      </FlexBox>
      {hit.logistics_categories && (
        <TypeList items={hit.logistics_categories} />
      )}
      {hit.policy_or_guideline_link && (
        <Cta href={hit.policy_or_guideline_link} extIcon>
          Website
        </Cta>
      )}
    </article>
  );
};

export default PolicySearchItem;

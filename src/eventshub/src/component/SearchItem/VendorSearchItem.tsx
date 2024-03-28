import { Hit as AlgoliaHit } from 'instantsearch.js/es/types';
import Cta from '../Cta/Cta';
import { Heading, Paragraph } from '../Typography';
import TypeList from './TypeList';
import { FlexBox } from '../FlexBox';
import { CheckIcon } from '@heroicons/react/16/solid';

type VendorSearchItemProps = {
  hit: AlgoliaHit<{
    name?: string;
    stanford_service_provider?: string;
    service_type?: string[];
    current_stanford_supplier?: string;
    supplier_summary?: string;
    business_address?: string;
    url?: string;
    contact_email?: string;
    inquiry_form_or_contact?: string;
  }>;
};

const VendorSearchItem = ({ hit }: VendorSearchItemProps) => {
  return (
    <article className='er-border-b er-rs-mt-2 er-rs-pb-1'>
      <FlexBox direction='row' justifyContent='between'>
        <Heading as='h3' className='er-m-0'>
          {hit.name}
        </Heading>
        <FlexBox direction='row' alignItems='center'>
          <Paragraph  className='er-mb-0 er-mr-10'>
            Stanford Service Provider
          </Paragraph>
            {hit.stanford_service_provider ? (
              <CheckIcon className='er-w-20 er-h-20 er-border-2 er-rounded' />
            ): (
              <div className='er-w-20 er-h-20 er-border-2 er-rounded'/>
            )}
        </FlexBox>
      </FlexBox>
      {hit.service_type && <TypeList items={hit.service_type} />}
      {hit.current_stanford_supplier && (
        <Paragraph>
          Current Stanford Supplier:{' '}
          <span className='er-font-bold'>{hit.current_stanford_supplier}</span>
        </Paragraph>
      )}
      {hit.supplier_summary && (
        <Paragraph>Summary: {hit.supplier_summary}</Paragraph>
      )}
      {hit.business_address && <Paragraph>{hit.business_address}</Paragraph>}
      <FlexBox
        direction='row'
        className='children:er-px-10 first:children:er-pl-0 children:er-border-r-2 children:er-border-digital-red last:children:er-border-none'
      >
        {hit.contact_email && <Cta href={hit.contact_email}>Contact</Cta>}
        {hit.inquiry_form_or_contact && (
          <Cta href={hit.inquiry_form_or_contact}>Inquiry</Cta>
        )}
        {hit.url && (
          <Cta href={hit.url} extIcon>
            Website
          </Cta>
        )}
      </FlexBox>
    </article>
  );
};

export default VendorSearchItem;

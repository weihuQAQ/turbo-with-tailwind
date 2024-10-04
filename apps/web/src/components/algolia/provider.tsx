'use client';

import { PropsWithChildren } from 'react';

import { Configure, InstantSearch } from 'react-instantsearch';

import { envObject } from '@/constants';
import { algoliaClient } from '@/utils/algolia';

export function AlgoliaProvider(props: PropsWithChildren) {
  return (
    <InstantSearch searchClient={algoliaClient} indexName={`${envObject.ALGOLIA_ENV}_${envObject.ALGOLIA_INDEX}`}>
      <Configure filters={'sites: US'} />
      {props.children}
    </InstantSearch>
  );
}

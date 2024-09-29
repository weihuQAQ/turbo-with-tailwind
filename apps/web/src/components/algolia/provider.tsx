'use client';

import { PropsWithChildren } from 'react';

import { InstantSearchNext } from 'react-instantsearch-nextjs';

import { envObject } from '@/constants';
import { algoliaClient } from '@/utils/algolia';

export function AlgoliaProvider(props: PropsWithChildren) {
  return (
    <InstantSearchNext searchClient={algoliaClient} indexName={`${envObject.ALGOLIA_ENV}_${envObject.ALGOLIA_INDEX}`}>
      {props.children}
    </InstantSearchNext>
  );
}

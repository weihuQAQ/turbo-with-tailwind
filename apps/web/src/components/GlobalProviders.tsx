'use client';

import { PropsWithChildren } from 'react';

import { AlgoliaProvider } from '@/components/algolia/provider';

export function GlobalProviders(props: PropsWithChildren) {
  return <AlgoliaProvider>{props.children}</AlgoliaProvider>;
}

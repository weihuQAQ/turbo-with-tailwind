import { PageTree } from '@/utils';

import { createServerContext } from './serverContext';

export interface PageTreeAttributes {
  name: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  configuration: string;
  pageType: string;
  productGroup: PageTree;
  assetContentGroups: PageTree[];
}

export const PLPContext = createServerContext<{ page: PageTree<PageTreeAttributes> }>();

export const { Provider: PLPContextProvider } = PLPContext;

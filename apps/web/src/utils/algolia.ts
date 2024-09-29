import { algoliasearch } from 'algoliasearch';

import { envObject } from '@/constants';

export const algoliaClient = algoliasearch(envObject.ALGOLIA_APPID, envObject.ALGOLIA_APIKEY);

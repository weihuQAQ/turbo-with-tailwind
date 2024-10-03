import _ from 'lodash';
import { ProxyAgent } from 'undici';

import { envObject } from '@/constants';
import { PageTreeAttributes } from '@/contexts/plp';

const dispatcher = new ProxyAgent(envObject.PROXY_HOST);

function normalizeSearchParameters(query: Record<string, unknown>) {
  const params = new URLSearchParams();
  for (const key in query) {
    if (Array.isArray(query[key])) {
      params.append(key, (query[key] as unknown[]).join(','));
    } else {
      params.append(key, `${query[key]}`);
    }
  }
  return params.toString();
}

async function request(url: string | URL | globalThis.Request, init: RequestInit = {}) {
  return await fetch(url, { ...(envObject.isDev ? { dispatcher } : {}), ...init }).then((res) => res.json());
}

export async function syncContentful(init: RequestInit = {}) {
  const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_ENVIRONMENT, CONTENTFUL_SPACE_ID, CONTENTFUL_HOST } = envObject;
  const baseUrl = `https://${CONTENTFUL_HOST}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/sync`;

  const sync = async (prev?: any) => {
    if (!prev) {
      const query = normalizeSearchParameters({ access_token: CONTENTFUL_ACCESS_TOKEN, initial: true });
      const response = await request(`${baseUrl}?${query}`, init);

      return sync(response);
    }

    if (prev.nextPageUrl) {
      const url = new URL(prev.nextPageUrl);
      url.searchParams.append('access_token', CONTENTFUL_ACCESS_TOKEN!);
      const response = await request(url, init);

      return sync({ ...response, items: prev.items.concat(response.items) });
    }

    return prev;
  };

  try {
    console.debug(`Call to Contentful API started`);
    const response = await sync();
    console.debug(`Call to Contentful API completed`);
    return response as { items: any[]; nextSyncUrl: string; sys: any };
  } catch (e) {
    console.error(`An error occurred while calling the Contentful API: ${e}`);
    throw e;
  }
}

export async function fetchPageId(slug: string) {
  const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_ENVIRONMENT, CONTENTFUL_SPACE_ID, CONTENTFUL_GRAPHQL_HOST } = envObject;

  const query = normalizeSearchParameters({
    access_token: CONTENTFUL_ACCESS_TOKEN,
    query: `
      query ($uri: String!) {
        pageAssetCollection(where: { URI: $uri }) {
          items {
            uri
            name,
            sys {
              id
            }
          }
        }
      }
    `,
    variables: JSON.stringify({ uri: slug })
  });
  const url = `https://${CONTENTFUL_GRAPHQL_HOST}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}?${query}`;

  const res = await request(url, {
    headers: { Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
    method: 'GET'
  });

  return res.data.pageAssetCollection.items[0]?.sys.id;
}

export interface PageTree<T = {}> {
  extractFields: Record<string, PageTree | PageTree[] | string | number | string[] | number[]> & T;
}

function generatePageTree(items: any[], rootId: string, locale = 'en-US'): PageTree<PageTreeAttributes> {
  const root = _.cloneDeep(items.find((item) => item.sys.id === rootId));

  const fields = root?.fields || {};
  const extractFields: Record<string, any> = {};

  for (const key in fields) {
    if (Array.isArray(fields[key]?.[locale])) {
      extractFields[key] = fields[key][locale]
        ?.map((val) => {
          if (val.sys?.id) {
            return generatePageTree(items, val.sys.id);
          }
          return val;
        })
        .filter(Boolean);
    } else if (fields[key][locale]?.sys?.id) {
      extractFields[key] = generatePageTree(items, fields[key][locale].sys.id);
    } else {
      extractFields[key] = fields[key][locale];
    }
  }

  if (root) root.extractFields = extractFields;

  return root;
}

export async function fetchPage(slug: string) {
  const pageId = await fetchPageId(slug);
  const { items } = await syncContentful();

  return generatePageTree(items, pageId);
}

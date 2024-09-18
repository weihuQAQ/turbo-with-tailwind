import { ProxyAgent } from 'undici';

import { envObject } from '../constants';

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

// eslint-disable-next-line no-undef
export async function syncContentful(init: RequestInit = {}) {
  const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_ENVIRONMENT, CONTENTFUL_SPACE_ID, CONTENTFUL_HOST, isDev } = envObject;
  const baseUrl = `https://${CONTENTFUL_HOST}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/sync`;

  const sync = async (prev?: any) => {
    if (!prev) {
      const query = normalizeSearchParameters({ access_token: CONTENTFUL_ACCESS_TOKEN, initial: true });
      // @ts-ignore
      const response = await fetch(`${baseUrl}?${query}`, { ...(isDev ? { dispatcher } : {}), ...init }).then((res) =>
        res.json()
      );

      return sync(response);
    }

    if (prev.nextPageUrl) {
      const url = new URL(prev.nextPageUrl);
      url.searchParams.append('access_token', CONTENTFUL_ACCESS_TOKEN!);
      // @ts-ignore
      const response = await fetch(url, { dispatcher, ...init }).then((res) => res.json());

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

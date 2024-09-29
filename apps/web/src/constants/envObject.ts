export const envObject = {
  ALGOLIA_APIKEY: process.env.NEXT_PUBLIC_ALGOLIA_APIKEY as string,
  ALGOLIA_APPID: process.env.NEXT_PUBLIC_ALGOLIA_APPID as string,
  ALGOLIA_ARTICLE_INDEX: process.env.NEXT_PUBLIC_ALGOLIA_ARTICLE_INDEX as string,
  ALGOLIA_ENV: process.env.NEXT_PUBLIC_ALGOLIA_ENV as string,
  ALGOLIA_INDEX: process.env.NEXT_PUBLIC_ALGOLIA_INDEX as string,
  ALGOLIA_KEYWORD_REDIRECT_INDEX: process.env.NEXT_PUBLIC_ALGOLIA_KEYWORD_REDIRECT_INDEX as string,
  ALGOLIA_SUGGESTED_INDEX: process.env.NEXT_PUBLIC_ALGOLIA_SUGGESTED_INDEX as string,
  BUILD_SITE: process.env.BUILD_SITE as 'US' | 'CA',
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT as string,
  CONTENTFUL_GRAPHQL_HOST: process.env.CONTENTFUL_GRAPHQL_HOST as string,
  CONTENTFUL_HOST: process.env.CONTENTFUL_HOST as string,
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID as string,
  LOCALE: process.env.LOCALE as string,
  PROXY_HOST: process.env.PROXY_HOST as string,
  isDev: process.env.NODE_ENV === 'development'
};

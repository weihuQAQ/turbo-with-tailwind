import { JsonViewer } from '@/components';
import { PageAsset } from '@/components/contentful';
import { GlobalProviders } from '@/components/GlobalProviders';
import { PLPContextProvider } from '@/contexts/plp';
import { fetchPage } from '@/utils';

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function Page(props: PageProps) {
  const page = await fetchPage(`/b/${props.params.slug.join('/')}`);

  return (
    <PLPContextProvider value={{ page }}>
      <GlobalProviders>
        <main id="main-section">
          <PageAsset />

          <JsonViewer content={page} log />
        </main>
      </GlobalProviders>
    </PLPContextProvider>
  );
}

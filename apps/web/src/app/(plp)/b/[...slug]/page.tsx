import { JsonViewer } from '@/components';
import { PageAsset } from '@/components/contentful';
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
      <main id="main-section">
        <div>/b/{props.params.slug.join('/')}</div>
        <hr />

        <hr />
        <JsonViewer content={page} log />

        <PageAsset />
      </main>
    </PLPContextProvider>
  );
}

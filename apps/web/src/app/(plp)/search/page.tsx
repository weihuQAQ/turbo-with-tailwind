import { JsonViewer } from '@/components';
import { PageAsset } from '@/components/contentful';
import { GlobalProviders } from '@/components/GlobalProviders';
import { PLPContextProvider } from '@/contexts/plp';
import { fetchPage } from '@/utils';

export default async function Page() {
  const page = await fetchPage(`/search`);

  return (
    <PLPContextProvider value={{ page }}>
      <GlobalProviders>
        <PageAsset />
        <JsonViewer content={page} render log />
      </GlobalProviders>
    </PLPContextProvider>
  );
}

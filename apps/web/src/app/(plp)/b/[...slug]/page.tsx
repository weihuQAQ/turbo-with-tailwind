import { JsonViewer } from '../../../../components';
import { syncContentful } from '../../../../utils';

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function Page(props: PageProps) {
  const res = await syncContentful();

  return (
    <div>
      <div>/b/{props.params.slug.join('/')}</div>
      <hr />

      <div>{res.items.length}</div>
      <div>{res.nextSyncUrl}</div>

      <hr />

      <JsonViewer content={{ ...res, items: res.items.filter((_, index) => index < 20) }} />
    </div>
  );
}

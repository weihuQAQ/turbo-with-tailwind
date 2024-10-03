import { ContentfulComponent } from '@/components/contentful';
import { componentMap } from '@/components/contentful/componentMap';
import { PLPContext } from '@/contexts/plp';
import { getServerContextValue } from '@/contexts/serverContext';

export interface AssetContentWidgetProps {
  name: string;
  componentType: string;
  contentKey: 'A' | 'B' | 'C' | 'D' | 'E';
}

export function AssetContentWidget(props: AssetContentWidgetProps) {
  const { contentKey } = props;
  const { page } = getServerContextValue(PLPContext);

  const targetContent = page.extractFields.assetContentGroups.find(
    (group) => group.extractFields.targetContentKey === contentKey
  );

  return <ContentfulComponent widgets={targetContent?.extractFields.content as any[]} componentsMap={componentMap} />;
}

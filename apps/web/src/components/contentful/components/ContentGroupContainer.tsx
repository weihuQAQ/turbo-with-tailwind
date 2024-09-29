import clsx from 'clsx';

import { ContentfulComponent, ExampleComponent } from '@/components/contentful';
import { componentMap } from '@/components/contentful/componentMap';

export interface ContentGroup {
  name: string;
  content: string;
  configuration: string;
  componentType: string;
}

export function ContentGroupContainer(props: ContentGroup) {
  const { configuration, content, name, componentType } = props;

  return (
    <div className={clsx('content-group-container', JSON.parse(configuration ?? '{}').className)}>
      <ExampleComponent title={`${name}: ${componentType}`} contentClass="tw-flex">
        <ContentfulComponent widgets={content as any} componentsMap={componentMap} />
      </ExampleComponent>
    </div>
  );
}

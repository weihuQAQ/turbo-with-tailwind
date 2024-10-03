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

  const config = JSON.parse(configuration ?? '{}');

  return (
    <div className={clsx('content-group-container')}>
      <ExampleComponent
        title={`${name}: ${componentType}`}
        contentClass={clsx(config.containerClass, {
          'tw-flex': config.containerClass === 'new-plp'
          // tw-flex-1
        })}
      >
        <ContentfulComponent widgets={content as any} componentsMap={componentMap} />
      </ExampleComponent>
    </div>
  );
}

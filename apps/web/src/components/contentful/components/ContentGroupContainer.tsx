import clsx from 'clsx';

import { ContentfulComponent } from '@/components/contentful';
import { componentMap } from '@/components/contentful/componentMap';

export interface ContentGroup {
  name: string;
  content: string;
  configuration: string;
  componentType: string;
}

export function ContentGroupContainer(props: ContentGroup) {
  const { configuration, content } = props;

  const config = JSON.parse(configuration ?? '{}');

  return (
    <div
      // has-[.plp-filters]:tw-flex not working properly
      className={clsx('content-group-container tw-group has-[[data-filters]]:tw-flex tw-block', config.containerClass)}
    >
      <ContentfulComponent widgets={content as any} componentsMap={componentMap} />
    </div>
  );
}

import { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { PLPContext } from '@/contexts/plp';
import { getServerContextValue } from '@/contexts/serverContext';
import { PageTree } from '@/utils';

import { componentMap } from './componentMap';

export function ExampleComponent(
  props: PropsWithChildren<{ title: string; className?: string; contentClass?: string }>
) {
  return (
    <fieldset className={clsx('tw-border tw-border-black tw-border-solid tw-p-2 tw-m-2', props.className)}>
      <legend className="tw-bg-black tw-text-white tw-px-2">{props.title}</legend>
      <div className={props.contentClass}>{props.children}</div>
    </fieldset>
  );
}

const StaticContentWidgetMap = ['StaticMessageRibbon', 'StaticHTML', 'StaticCSS', 'StaticJS'];

export function ContentfulComponent(props: { widgets: any[]; componentsMap: Record<string, any> }) {
  const { widgets, componentsMap } = props;

  return widgets.map((widget, index) => {
    const { extractFields: fields, sys } = widget;
    const { componentType } = fields;

    const Component = componentsMap[componentType] ?? ExampleComponent;
    if (!Component) {
      console.warn(`Component ${componentType} not found in ${Object.keys(componentsMap as Record<string, unknown>)}.`);
      return null;
    }

    if (componentType === 'ContentGroupContainer') {
      return (
        <Component
          key={`${sys.id}-${index}`}
          name={fields.name}
          componentType={componentType}
          content={fields.content}
        />
      );
    }

    if (componentType === 'AssetContent') {
      return (
        <Component
          key={`${sys.id}-${index}`}
          name={fields.name}
          componentType={componentType}
          contentKey={fields.contentKey}
        />
      );
    }

    if (StaticContentWidgetMap.includes(componentType)) {
      const { assets = [] } = fields;
      return (
        <Component
          key={`${sys.id}-${index}`}
          name={fields.name}
          assets={assets.map((asset: any) => asset.extractFields)}
        />
      );
    }

    return (
      <Component
        key={`${sys.id}-${index}`}
        name={fields.name}
        componentType={componentType}
        configuration={fields.configuration}
      />
    );
  });
}

export function PageAsset() {
  const { page } = getServerContextValue(PLPContext);

  return (
    <div>
      <ExampleComponent title={page.extractFields.name}>
        <ContentfulComponent
          // @ts-ignore
          widgets={(page.extractFields.template as PageTree).extractFields.content}
          componentsMap={componentMap}
        />
      </ExampleComponent>
    </div>
  );
}

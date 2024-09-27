import { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { PageTreeAttributes } from '@/contexts/plp';
import { PageTree } from '@/utils';

import { componentMap } from './componentMap';

export function ExampleComponent(props: PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <fieldset className={clsx('tw-border tw-border-black tw-border-solid tw-p-2 tw-m-2', props.className)}>
      <legend className="tw-bg-black tw-text-white tw-px-2">{props.title}</legend>
      <div>{props.children}</div>
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
      console.log(123, fields.name);
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

export interface PageAssetProps {
  page: PageTree<PageTreeAttributes>;
}

export function PageAsset(props: PageAssetProps) {
  return (
    <div>
      <ExampleComponent title={props.page.extractFields.name}>
        <ExampleComponent title="Meta">
          <h2>{props.page.extractFields.metaTitle}</h2>
          <img src={props.page.extractFields.ogImage} alt="" className="tw-h-20" />
        </ExampleComponent>

        <ContentfulComponent
          // @ts-ignore
          widgets={(props.page.extractFields.template as PageTree).extractFields.content}
          componentsMap={componentMap}
        />
      </ExampleComponent>
    </div>
  );
}

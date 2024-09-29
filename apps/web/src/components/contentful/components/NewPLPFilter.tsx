'use client';

import { RefinementList } from 'react-instantsearch';

import { ExampleComponent } from '@/components/contentful';
import { FunctionalWidgetProps } from '@/components/contentful/FunctionalWidget';

export interface FilterItem {
  displayName: string;
  componentName: string;
  filters: {
    displayName: string;
    name: string;
    isDynamic: boolean;
    isSort: boolean;
    isInternal?: boolean;
    refinements?: { label: string; value: string; imageUrl?: string }[];
  }[];
}

export function NewPLPFilter(props: FunctionalWidgetProps) {
  const filterConfig = JSON.parse(props.configuration) as FilterItem[];

  return (
    <ExampleComponent title={`${props.name}: ${props.componentType}`}>
      <div>
        {filterConfig.map((category) => {
          const { filters, displayName, componentName } = category;

          return (
            <ExampleComponent key={`${displayName}: ${componentName}`} title={`${displayName}: ${componentName}`}>
              {filters.map((filter) => (
                <RefinementList key={`${filter.displayName}: ${filter.name}`} attribute={filter.name} />
              ))}
            </ExampleComponent>
          );
        })}
      </div>
    </ExampleComponent>
  );
}

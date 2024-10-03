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

// const useTransformItemsFactory = (refinements: { value: string }[]) => (items: { value: string }[]) =>
//   items.filter((item) => refinements.some((refinement) => refinement.value === item.value));

export function NewPLPFilter(props: FunctionalWidgetProps) {
  const filterConfig = JSON.parse(props.configuration) as FilterItem[];

  return (
    <ExampleComponent title={`${props.name}: ${props.componentType}`}>
      <div data-filters="" className="plp-filters">
        {filterConfig.map((category) => {
          const { filters, displayName, componentName } = category;

          return (
            <ExampleComponent key={`${displayName}: ${componentName}`} title={`${displayName}: ${componentName}`}>
              {filters.map((filter) => (
                <RefinementList
                  classNames={{ label: 'tw-space-x-2' }}
                  key={`${filter.displayName}: ${filter.name}`}
                  attribute={filter.name}
                  limit={50}
                />
              ))}
            </ExampleComponent>
          );
        })}
      </div>
    </ExampleComponent>
  );
}

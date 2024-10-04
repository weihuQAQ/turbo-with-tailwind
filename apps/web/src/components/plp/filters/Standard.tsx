'use client';

import { useMemo } from 'react';

import clsx from 'clsx';
import { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { useRefinementList } from 'react-instantsearch';

import { FilterCategoryItem, FilterItem, Refinement } from '@/components/contentful/components/NewPLPFilter';
import { FilterCheckbox } from '@/components/plp/filters/FilterCheckbox';
import { envObject } from '@/constants';

function useItemsTransfer(options: FilterItem & { items: RefinementListItem[] }): {
  targetItems: (RefinementListItem & Refinement)[];
} {
  const seq = useMemo(() => options.refinements?.map((v) => v.value ?? v.label) ?? [], [options.refinements]);

  const sorted = useMemo(() => {
    const copy = [...options.items];

    // Sort by configured refinements
    if (options.isSort) {
      copy.sort((a, b) => {
        const indexA = seq.findIndex((item) => item === a.value || item === a.value);
        const indexB = seq.findIndex((item) => item === b.value || item === b.value);

        if (indexA === -1 && indexB !== -1) return 1;
        if (indexB === -1 && indexA !== -1) return -1;

        return indexA - indexB;
      });
    }

    // Preserve configured properties
    return options.items.map((item: RefinementListItem) => ({
      ...item,
      ...(options.refinements?.find(
        (refinement) => refinement.value === item.value || refinement.label === item.value
      ) ?? {})
    }));
  }, [seq, options.isSort, options.items]);

  const targetItems = useMemo(() => {
    if (options.isDynamic) {
      return sorted;
    }
    return sorted.filter((v) => seq.includes(v.value));
  }, [sorted]);

  return {
    targetItems
  };
}

const site = envObject.BUILD_SITE.toLowerCase();

function StandardFilterItem(props: FilterItem & { showColorPanel?: boolean }) {
  const attribute = props.isInternal ? `${props.name}.${site}` : props.name;
  const { items, refine } = useRefinementList({ attribute, limit: 100 });

  const { targetItems } = useItemsTransfer({ ...props, items });

  if (attribute === 'prod_material') {
    console.log(123, { targetItems, refinements: props.refinements, items });
  }

  return (
    <div className="tw-flex tw-flex-col tw-justify-center tw-items-start">
      {targetItems.map((item) => (
        <FilterCheckbox
          key={item.value ?? item.label}
          label={
            <span className="tw-flex tw-space-x-2 tw-items-center">
              {item.imageUrl && <img src={item.imageUrl} alt={item.label} />}
              {props.showColorPanel && (
                <span
                  className={clsx(
                    'tw-w-5 tw-h-5 tw-block tw-rounded-full',
                    `color-${item.value.toLowerCase().replace(/\s+/g, '-')}`
                  )}
                />
              )}
              <span className="tw-block">{item.label}</span>
            </span>
          }
          checked={item.isRefined}
          onChange={() => refine(item.value)}
        />
      ))}
    </div>
  );
}

export function StandardFilter(props: FilterCategoryItem) {
  return (
    <div>
      {props.filters.map((filter) => (
        <StandardFilterItem key={filter.name} showColorPanel={props.componentName === 'Color'} {...filter} />
      ))}
    </div>
  );
}

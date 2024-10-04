'use client';

import { Fragment, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useRefinementList } from 'react-instantsearch';

import { FunctionalWidgetProps } from '@/components/contentful/FunctionalWidget';
import { Filters } from '@/components/plp/filters';

export interface Refinement {
  label: string;
  value: string;
  imageUrl?: string;
}

export interface FilterItem {
  displayName: string;
  name: string;
  isDynamic: boolean;
  isSort: boolean;
  isInternal?: boolean;
  refinements?: Refinement[];
}

export interface FilterCategoryItem {
  displayName: string;
  componentName: string;
  filters: FilterItem[];
}

function RefinementItem(props: { attribute: string; limit?: number }) {
  useRefinementList({ attribute: props.attribute, limit: props.limit ?? 50 });
  return null;
}

export function NewPLPFilter(props: FunctionalWidgetProps) {
  const filterConfig = JSON.parse(props.configuration) as FilterCategoryItem[];
  const headerHeight = '64px';
  const mobileHeaderHeight = '56px';

  useEffect(() => {
    console.log(123, filterConfig);
  }, []);

  return (
    <Box
      sx={(theme) => ({
        minWidth: '200px',
        maxWidth: '280px',
        top: mobileHeaderHeight,
        maxHeight: `calc(100vh - ${mobileHeaderHeight})`,
        [theme.breakpoints.up('md')]: {
          top: headerHeight,
          maxHeight: `calc(100vh - ${headerHeight})`
        }
      })}
      position="sticky"
      data-filters=""
      className="plp-filters tw-peer"
    >
      <div className="tw-relative tw-max-h-full tw-flex tw-flex-col">
        {filterConfig.map((category) => {
          const { filters } = category;

          return (
            <Fragment key={category.displayName}>
              {filters.map((filter, index) => (
                <RefinementItem key={`${filter.name}-${index}`} attribute={filter.name} />
              ))}
            </Fragment>
          );
        })}

        <OverlayScrollbarsComponent defer options={{ scrollbars: { autoHide: 'leave' } }}>
          <Typography className="tw-p-4 tw-border-r">Filters</Typography>
          <Filters config={filterConfig} />
        </OverlayScrollbarsComponent>
      </div>
    </Box>
  );
}

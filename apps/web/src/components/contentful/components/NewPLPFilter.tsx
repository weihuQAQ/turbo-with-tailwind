'use client';

import { Fragment } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useRefinementList } from 'react-instantsearch';

import { FunctionalWidgetProps } from '@/components/contentful/FunctionalWidget';
import { Filters } from '@/components/plp';

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

function RefinementItem(props: { attribute: string; limit?: number }) {
  useRefinementList({ attribute: props.attribute, limit: props.limit ?? 50 });
  return null;
}

export function NewPLPFilter(props: FunctionalWidgetProps) {
  const filterConfig = JSON.parse(props.configuration) as FilterItem[];
  const headerHeight = '64px';
  const mobileHeaderHeight = '56px';

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

        <OverlayScrollbarsComponent defer options={{ scrollbars: { autoHide: 'move' } }}>
          <Typography className="tw-p-4 tw-border-r">Filters</Typography>
          <Filters config={filterConfig} />
        </OverlayScrollbarsComponent>
      </div>
    </Box>
  );
}

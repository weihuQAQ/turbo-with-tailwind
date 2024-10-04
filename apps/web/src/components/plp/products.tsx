'use client';

import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import _ from 'lodash';
import { Hits, usePagination } from 'react-instantsearch';

import { ProductTile } from '@/components/common';
import { type FunctionalWidgetProps } from '@/components/contentful/FunctionalWidget';
import { envObject } from '@/constants';

const productNameFormatter = (name: string) => `${_.endsWith(name, ' Glasses') ? name.slice(0, -7) : name}`;
const site = envObject.BUILD_SITE.toLowerCase();

export function Products(props: FunctionalWidgetProps) {
  const config = JSON.parse(props.configuration ?? '{}');
  const { nbHits } = usePagination();
  const [columns, setColumns] = useState(3);
  const [mobileColumns, setMobileColumns] = useState(2);

  useEffect(() => {
    console.log(config);
  }, []);

  return (
    <div className="tw-space-y-2 tw-mt-2">
      <div className="tw-sticky tw-top-16 tw-space-y-2 tw-bg-white">
        <div className="tw-border-y"></div>
        <div className="tw-py-2 tw-border-y tw-bg-gray-50 tw-flex tw-justify-between tw-items-center">
          <div>
            <Typography>Showing 1-24 of {nbHits} results</Typography>
          </div>
          <div>
            <Button onClick={() => setMobileColumns(1)} className="lg:!tw-hidden">
              1 Column
            </Button>
            <Button onClick={() => setMobileColumns(2)} className="lg:!tw-hidden">
              2 Column
            </Button>
            <Button onClick={() => setColumns(2)} className="max-lg:!tw-hidden">
              2 Column
            </Button>
            <Button onClick={() => setColumns(3)} className="max-lg:!tw-hidden">
              3 Column
            </Button>
          </div>
        </div>
      </div>

      <Hits
        classNames={{
          list: clsx(
            'tw-grid tw-grid-cols-3 tw-gap-4',
            ['lg:tw-grid-cols-3', 'lg:tw-grid-cols-2'].find((v) => v.includes(String(columns))),
            ['max-lg:tw-grid-cols-2', 'max-lg:tw-grid-cols-1'].find((v) => v.includes(String(mobileColumns)))
          )
        }}
        hitComponent={({ hit }) => (
          <ProductTile
            key={hit.objectID}
            id={hit.prod_id}
            img={hit.sku_image_url ?? hit.prod_full_image}
            imgAlt={'image'}
            // TODO
            focusImg={hit.sku_image_url?.replace('-front', '-angle') ?? hit.prod_full_image}
            focusImgAlt={'focus image'}
            name={productNameFormatter(hit.prod_name)}
            price={{
              listPrice: hit.sku_price[site],
              salePrice: 0,
              isOnSale: false
            }}
            rating={{
              score: 4.5,
              count: 188
            }}
            url={hit.prod_url}
            productUrl={hit.prod_url}
            skus={hit.all_variants?.map((item: any) => ({ id: item.sku_id, colorClass: '' })) ?? []}
            skuLimit={3}
            isFavorite={false}
          />
        )}
      />
    </div>
  );
}

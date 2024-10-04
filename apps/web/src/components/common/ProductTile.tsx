import { FavoriteBorder, Star } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

export interface ProductTileProps {
  id: string;
  img: string;
  focusImg: string;
  imgAlt: string;
  focusImgAlt: string;
  name: string;
  isFavorite?: boolean;
  price: {
    listPrice: number;
    salePrice: number;
    isOnSale: boolean;
  };
  rating: {
    score: number;
    count: number;
  };
  url: string;
  productUrl: string;
  skus: {
    id: string;
    colorClass: string;
  }[];
  skuLimit?: number;
}

export function ProductTile(props: ProductTileProps) {
  const currency = '$';

  return (
    <div className="tw-space-y-2 tw-group tw-cursor-pointer">
      <div className="cover tw-space-y-2">
        <div className="top-section tw-flex tw-justify-between tw-items-center">
          <div>Best seller</div>
          <div>
            <FavoriteBorder />
          </div>
        </div>

        <div className="cover-image tw-flex tw-justify-between tw-items-center">
          <img
            className="group-hover:tw-hidden tw-aspect-[1/0.8] tw-object-contain tw-text-transparent tw-w-full"
            src={props.img}
            alt={props.imgAlt}
          />
          <img
            className="tw-hidden group-hover:tw-block tw-aspect-[1/0.8] tw-object-contain tw-text-transparent tw-w-full"
            src={props.focusImg}
            alt={props.imgAlt}
          />
        </div>
      </div>

      <div className="tw-flex tw-justify-between tw-items-center">
        <Typography component="div" className="tw-font-bold">
          {currency}
          {props.price.listPrice}
        </Typography>

        <Typography component="div" className="tw-flex tw-justify-between tw-items-center">
          <Star />
          <span className="tw-font-bold">{props.rating.score}</span>
          <span>({props.rating.count})</span>
        </Typography>
      </div>

      <Typography component="div">{props.name}</Typography>

      <div>
        {props.skus.map((sku) => (
          <button key={sku.id}>
            <div className={sku.colorClass}></div>
          </button>
        ))}
      </div>
    </div>
  );
}

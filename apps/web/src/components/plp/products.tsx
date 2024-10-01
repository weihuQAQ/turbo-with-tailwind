import { Hits } from 'react-instantsearch';

export function Products() {
  return (
    <div>
      <Hits
        hitComponent={(item) => (
          <div>
            <p>{item.hit.prod_name}</p>
            <img className="tw-max-h-16" src={item.hit.sku_image_url} alt="" />
          </div>
        )}
      />
    </div>
  );
}

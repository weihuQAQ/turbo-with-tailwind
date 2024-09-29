import { Hits } from 'react-instantsearch';

export function Products() {
  return (
    <div>
      <Hits
        hitComponent={(item) => (
          <div>
            <p>{item.hit.prod_name}</p>
          </div>
        )}
      />
    </div>
  );
}

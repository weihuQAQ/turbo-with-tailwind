import { RefinementList } from 'react-instantsearch';

export function Filters() {
  return (
    <div>
      <RefinementList attribute="prod_brand" title="Brands" />
    </div>
  );
}

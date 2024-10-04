import { useToggleRefinement } from 'react-instantsearch';

import { FilterCategoryItem } from '@/components/contentful/components/NewPLPFilter';
import { FilterCheckbox } from '@/components/plp/filters/FilterCheckbox';

export function FastFrame(props: FilterCategoryItem) {
  const attribute = props.filters[0]?.name ?? '';

  const { refine, value } = useToggleRefinement({ attribute });

  return <FilterCheckbox label="Rush delivery" checked={value.isRefined} onChange={() => refine(value)} />;
}

import { ReactNode, SyntheticEvent } from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';

export function FilterCheckbox(props: {
  label: ReactNode;
  checked?: boolean;
  onChange?: (event: SyntheticEvent, checked: boolean) => void;
}) {
  return (
    <FormControlLabel label={props.label} checked={props.checked} onChange={props.onChange} control={<Checkbox />} />
  );
}

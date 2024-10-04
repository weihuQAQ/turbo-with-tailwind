import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';

import { FunctionalWidgetProps } from '@/components/contentful/FunctionalWidget';

export function NewPLPHeader(props: FunctionalWidgetProps) {
  const config = JSON.parse(props.configuration ?? '{}');

  return (
    <div className="[&_a]:tw-text-[#077] [&_a:hover]:tw-underline tw-space-y-2">
      <Typography variant="h4" component="h1" gutterBottom>
        {parse(config.infoTitle)}
      </Typography>
      <Typography component="div">{parse(config.description)}</Typography>
    </div>
  );
}

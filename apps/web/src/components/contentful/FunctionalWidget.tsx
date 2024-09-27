import { JsonViewer } from '@/components';
import { ExampleComponent } from '@/components/contentful';

export interface FunctionalWidgetProps {
  name: string;
  description: string;
  componentType: string;
  configuration: string;
}

export function FunctionalWidget(props: FunctionalWidgetProps) {
  return (
    <ExampleComponent title={`${props.name}: ${props.componentType}`}>
      <ExampleComponent title="Configuration" className="!tw-border-dotted">
        {props.configuration && <JsonViewer content={JSON.parse(props.configuration)} render collapsed />}
      </ExampleComponent>
    </ExampleComponent>
  );
}

import { JsonViewer } from '@/components';
import { ExampleComponent } from '@/components/contentful';
import { StaticAssetProps } from '@/components/contentful/components/StaticJS';

export function StaticMessageRibbon(props: StaticAssetProps) {
  return (
    <div className="static-message-ribbon-assets">
      <ExampleComponent title={props.name}>
        {props.assets.map((asset, index) => (
          <ExampleComponent title={asset.name} key={index}>
            <ExampleComponent title="Content" className="!tw-border-dotted">
              <JsonViewer content={JSON.parse(asset.content)} render collapsed />
            </ExampleComponent>
            <ExampleComponent title="Configuration" className="!tw-border-dotted">
              <JsonViewer content={JSON.parse(asset.configuration)} render collapsed />
            </ExampleComponent>
          </ExampleComponent>
        ))}
      </ExampleComponent>
    </div>
  );
}

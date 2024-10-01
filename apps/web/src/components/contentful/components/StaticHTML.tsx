import { StaticAssetProps } from '@/components/contentful/components/StaticJS';

export function StaticHTML(props: StaticAssetProps) {
  return (
    <div className="static-html-assets">
      {props.assets.map((asset, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: asset.content }} />
      ))}
    </div>
  );
}

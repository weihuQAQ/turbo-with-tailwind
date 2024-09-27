import { StaticAssetProps } from '@/components/contentful/components/StaticJS';

export function StaticCSS(props: StaticAssetProps) {
  return (
    <div
      className="static-css-assets"
      dangerouslySetInnerHTML={{ __html: props.assets.map((asset) => asset.content).join(' ') }}
    />
  );
}

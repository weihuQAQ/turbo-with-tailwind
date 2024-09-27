'use client';

import { useEffect } from 'react';

import md5 from 'blueimp-md5';

export interface StaticAssetProps {
  name: string;
  assets: {
    content: string;
    configuration: string;
    name: string;
  }[];
}

export function StaticJS(props: StaticAssetProps) {
  useEffect(() => {
    props.assets.map((asset) => {
      const scriptTag = document.createElement('script');
      const hash = md5(asset.content);
      scriptTag.text = asset.content;
      scriptTag.id = hash;
      if (!document.getElementById(hash)) {
        document.body.appendChild(scriptTag);
      }
    });
  }, []);

  return <div className="static-js-assets" />;
}

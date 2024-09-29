'use client';

import { useEffect } from 'react';

import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

export function JsonViewer(props: { content: object; render?: boolean; collapsed?: boolean; log?: boolean }) {
  useEffect(() => {
    if (props.log) {
      console.log(props.content);
    }
  }, [props.content, props.log]);

  if (props.render) {
    return <ReactJson src={props.content} collapsed={props.collapsed} />;
  }

  return <div>JsonViewer</div>;
}

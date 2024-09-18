'use client';

import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

export function JsonViewer(props: { content: object }) {
  return <ReactJson src={props.content} />;
}

import { PropsWithChildren } from 'react';

export default async function PlpLayout({ children }: PropsWithChildren) {
  return <div className="plp-page">{children}</div>;
}

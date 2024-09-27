import { cache, FunctionComponent, PropsWithChildren } from 'react';

export interface ServerContext<T> {
  Provider: FunctionComponent<PropsWithChildren<{ value: T }>>;
  _value: () => Map<string, T | undefined>;
}

export function createServerContext<T>(defaultValue?: T): ServerContext<T> {
  const _value = cache(() => new Map([['value', defaultValue]]));

  return {
    _value,
    Provider: ({ children, value }) => {
      _value().set('value', value);
      return children;
    }
  };
}

export function getServerContextValue<T>(context: ServerContext<T>) {
  return context._value().get('value') as T;
}

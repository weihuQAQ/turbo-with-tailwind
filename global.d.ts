import { ProxyAgent } from 'undici';

declare global {
  interface Window {
    dataLayer: any[];
  }
  interface RequestInit {
    dispatcher?: ProxyAgent;
  }
}

export {};

import sharedConfig from '@repo/tailwind-config';

import type { Config } from 'tailwindcss';

const config: Pick<Config, 'content' | 'presets' | 'prefix'> = {
  content: ['./src/**/*.tsx'],
  presets: [sharedConfig]
};

export default config;

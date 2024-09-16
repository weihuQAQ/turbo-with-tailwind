// tailwind config is required for editor support

import sharedConfig from '@repo/tailwind-config';

import type { Config } from 'tailwindcss';

const config: Pick<Config, 'content' | 'presets' | 'prefix'> = {
  content: ['./src/app/**/*.tsx'],
  prefix: 't-',
  presets: [sharedConfig]
};

export default config;

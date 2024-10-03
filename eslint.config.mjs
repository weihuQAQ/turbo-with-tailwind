import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'node_modules/**',
      '**/*.stories.tsx',
      '**/postcss.config.js',
      'next.config.js',
      'global.d.ts',
      'eslint.config.mjs'
    ]
  },
  { files: ['**/*.{js,mjs,cjs,ts,tsx}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, process: 'readonly', RequestInit: 'readonly' },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      ts,
      '@typescript-eslint': ts,
      import: importPlugin,
      prettier: eslintPluginPrettier
    }
  },
  js.configs.recommended,
  eslintConfigPrettier,
  //  Sort import
  {
    rules: {
      'import/no-self-import': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc'
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: 'react',
              position: 'before'
            },
            {
              group: 'external',
              pattern: 'next/**',
              position: 'before'
            },
            {
              group: 'internal',
              pattern: '@/**',
              position: 'after'
            },
            {
              group: 'type',
              pattern: '*.scss',
              patternOptions: { matchBase: true },
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['react'],
          warnOnUnassignedImports: true
        }
      ],
      'no-duplicate-imports': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false
        }
      ]
    }
  },
  {
    rules: {
      eqeqeq: 'error',
      'no-alert': 'error',
      'no-empty': 'error',
      'no-undef': 'error',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prettier/prettier': 'error'
      // 'sort-keys': [
      //   'error',
      //   'asc',
      //   {
      //     allowLineSeparatedGroups: true,
      //     caseSensitive: true,
      //     minKeys: 2,
      //     natural: true
      //   }
      // ]
    }
  }
];

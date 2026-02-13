import js from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import vitestPlugin from 'eslint-plugin-vitest';
import vitestGlobalsPlugin from 'eslint-plugin-vitest-globals';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'coverage/**',
      'dist/**',
      'build/**',
      '.yarn/**',
      'eslint.config.mjs',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      '@typescript-eslint': tsEslint,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...tsEslint.configs.recommended.rules,

      // TypeScript
      '@typescript-eslint/no-shadow': 'error',
      'no-shadow': 'off',

      // Import/Export - Disabled because it incorrectly detects .view, .context, etc.
      // as file extensions
      // 'import/extensions': ['error', 'never'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['vitest.config.ts', './tests/**', '**/*.test.tsx', '**/*.test.ts'],
        },
      ],

      // Unused imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // React
      'object-curly-newline': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-fragments': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', 'tests/**/*.{js,jsx,ts,tsx}', 'vitest.config.ts'],
    plugins: {
      vitest: vitestPlugin,
      'vitest-globals': vitestGlobalsPlugin,
    },
    languageOptions: {
      globals: {
        ...vitestGlobalsPlugin.environments.env.globals,
      },
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      ...vitestGlobalsPlugin.configs.recommended.rules,
      'vitest/max-nested-describe': ['error', { max: 3 }],
    },
  },
  prettierConfig,
];

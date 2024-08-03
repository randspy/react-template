import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat
    .extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'prettier',
    )
    .map((config) => ({
      ...config,
      files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
      settings: { react: { version: 'detect' } },
      rules: {
        ...config.rules,
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
      },
    })),
];

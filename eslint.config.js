// import react from 'eslint-plugin-react';
// import reactHooks from 'eslint-plugin-react-hooks';
import stylistic from '@stylistic/eslint-plugin-js';
import jsdoc from 'eslint-plugin-jsdoc';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import globals from 'globals';

import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const gitignorePath = path.resolve(dirname, '.gitignore');

export default [
	includeIgnoreFile(gitignorePath),
	{
		files: ['**/*.js', '**/*.jsx', '**/*.cjs'],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
		plugins: {
			jsdoc,
			'@stylistic/js': stylistic,
		},
		rules: {
			'newline-before-return': 'error',
			'no-constant-binary-expression': 'error',
			'no-implicit-coercion': 'error',
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'no-nested-ternary': 'error',
			'no-underscore-dangle': ['error', { allowAfterThis: true }],
			'no-void': 'error',
			'@stylistic/js/semi': 'error',
			'max-len': [
				'error',
				{
					code: 180,
					comments: 500,
					ignorePattern: '^import .*',
					ignoreStrings: true,
					ignoreTemplateLiterals: true,
					ignoreTrailingComments: true,
				},
			],
			'padding-line-between-statements': [
				'error',
				{
					blankLine: 'always',
					prev: '*',
					next: ['return', 'if', 'switch', 'for', 'while', 'try', 'throw'],
				},
				{
					blankLine: 'any',
					prev: ['const', 'let', 'var', 'import'],
					next: ['const', 'let', 'var', 'import'],
				},
			],
			// React-specific.
			// NOTE: Temporarily disabled because of compatibility of 'react-hooks' with ESLint 9.
			// 'consistent-return': 'warn',
			// 'no-param-reassign': 'warn',
			// 'react-hooks/rules-of-hooks': 'error',
			// // 'react-hooks/exhaustive-deps': ['error', { additionalHooks: '(useSafeLayoutEffect|useUpdateEffect)' }],
			// 'react/prop-types': ['error', { skipUndeclared: true }],
			// 'react/react-in-jsx-scope': 'off',
			// 'react/self-closing-comp': ['warn', { component: true, html: true }],
			// 'react/no-unknown-property': ['error', { ignore: ['css'] }],
			// JSDoc.
			'jsdoc/require-description': 'error',
			'jsdoc/check-values': 'error',
		},
		settings: {
			react: {
				version: '18',
			},
		},
	},
	eslintPluginPrettierRecommended,
];

import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: { globals: globals.browser },
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		plugins: { js },
		extends: ['js/recommended'],
	},
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	eslintPluginPrettierRecommended,
	{
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['warn'],
			'react/react-in-jsx-scope': 'off',
			'react/void-dom-elements-no-children': 'warn',
			'react/no-unsafe': 'warn',
			'react/self-closing-comp': 'warn',
			'react/jsx-boolean-value': ['warn', 'never'],
			'react/jsx-key': 'warn',
			'react/jsx-max-props-per-line': ['warn', { maximum: 7 }],
			'react/jsx-max-depth': ['warn', { max: 8 }],
			'arrow-body-style': ['warn', 'as-needed'],
			'jsx-quotes': ['warn', 'prefer-single'],
			'valid-typeof': 'warn',
			'@typescript-eslint/member-ordering': [
				'warn',
				{
					default: [
						'private-static-field',
						'protected-static-field',
						'public-static-field',
						'private-static-method',
						'protected-static-method',
						'public-static-method',
						'private-constructor',
						'protected-constructor',
						'public-constructor',
						'private-instance-field',
						'protected-instance-field',
						'public-instance-field',
						'private-instance-method',
						'protected-instance-method',
						'public-instance-method',
					],
				},
			],
			quotes: [2, 'single', { avoidEscape: true }],
		},
	},
]);

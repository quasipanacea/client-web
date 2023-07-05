/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript/recommended',
		'@vue/eslint-config-prettier',
	],
	env: {
		'vue/setup-compiler-macros': true,
		es2022: true,
	},
	ignorePatterns: ['common/**', 'server-deno/**'],
	overrides: [
		{
			files: ['cypress/integration/**.spec.{js,ts,jsx,tsx}'],
			extends: ['plugin:cypress/recommended'],
		},
		{
			files: ['postcss.config.*', 'tailwind.config.*'],
			env: {
				commonjs: true,
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
}

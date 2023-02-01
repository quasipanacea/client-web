import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssNesting from 'postcss-nesting'
import { rollupImportMapPlugin } from 'rollup-plugin-import-map'
// import myExample from './rollup-plugin-quazipanacea.js'

export default defineConfig({
	plugins: [
		// myExample(),
		vue(),
		{
			...rollupImportMapPlugin('./import_map.json'),
			enforce: 'post',
			apply: 'build',
		},
	],
	server: {
		port: 15_801,
		proxy: {
			'/api': {
				target: 'http://localhost:15800',
				secure: false,
				changeOrigin: true,
			},
			'/public': {
				target: 'http://localhost:15800',
				secure: false,
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		postcss: { plugins: [postcssNesting] },
	},
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default defineConfig({
	plugins: [
		vue(),
		nodeResolve({
			moduleDirectories: ['node_modules', 'dependencies'],
		}),
	],
	server: {
		port: 15_801,
		proxy: {
			'^/(api|trpc)': {
				target: 'http://localhost:15800',
			},
		},
	},
	build: {
		target: 'ES2022',
	},
	resolve: {
		alias: {
			'@client': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})

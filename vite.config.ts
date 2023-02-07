import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [vue()],
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
			'/trpc': {
				target: 'http://localhost:15799',
				secure: false,
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'#trpc-server': 'npm:@trpc/server@10.10.0',
		},
	},
})

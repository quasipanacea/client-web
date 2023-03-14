import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => {
						return ['ion-icon'].includes(tag)
					},
				},
			},
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
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@common': fileURLToPath(new URL('./common', import.meta.url)),
		},
	},
})

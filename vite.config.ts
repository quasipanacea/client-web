import { fileURLToPath, URL } from 'node:url'

import { defineConfig, PluginOption } from 'vite'
import type { ViteDevServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import veauryVitePlugins from 'veaury/vite/index.js'
// import history from "connect-history-api-fallback";

export default defineConfig({
	plugins: [
		// vue({
		// 	template: {
		// 		compilerOptions: {
		// 			isCustomElement: (tag) => ['ion-icon'].includes(tag),
		// 		},
		// 	},
		// }),
		veauryVitePlugins({
			type: 'vue',
			vueOptions: {
				template: {
					compilerOptions: {
						isCustomElement(tag: string) { return ['ion-icon'].includes(tag) }
					},
				},
			},
		}),
		// (() => {
		// 	// https://github.com/vitejs/vite/issues/2190
		// 	return {
		// 		name: 'rewrite-all',
		// 		configureServer(server: ViteDevServer) {
		// 			const handler = history({
		// 				disableDotRule: true,
		// 				rewrites: [{from: /\/$/, to: () => "/index.html"}]
		// 			});

		// 			server.middlewares.use((req, res, next) => {
		// 				handler(req, res, next)
		// 			});
		// 		}
		// 	}
		// })()
		// (function filterStdImportsPlugin(): PluginOption {
		// 	/**
		// 	 * Inserts file contents into the module tree for specified import paths. This fixes
		// 	 * issues on Vite halting when it encounters Deno-specific import paths. Code inspired
		// 	 * from alex-kinokon/rollup-plugin-ignore.
		// 	 */
		// 	const defaultFileContent = 'export default {}'
		// 	const placeholderFilename = '\0__rollup_plugin_filter_placeholder__\0'

		// 	return {
		// 		name: 'filter-std-imports',
		// 		resolveId(source: string | undefined) {
		// 			if (source?.startsWith('std/')) {
		// 				return placeholderFilename
		// 			}

		// 			return null
		// 		},
		// 		load(id: string) {
		// 			if (id === placeholderFilename) {
		// 				return defaultFileContent
		// 			}

		// 			return null
		// 		},
		// 	}
		// })(),
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
		target: 'ES2021',
	},
	resolve: {
		alias: {
			'@client': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})

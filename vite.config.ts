import { fileURLToPath, URL } from 'node:url'

import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import veauryVitePlugins from 'veaury/vite/index.js'

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
						isCustomElement: (tag) => ['ion-icon'].includes(tag),
					},
				},
			},
		}),
		(function filterStdImportsPlugin(): PluginOption {
			/**
			 * Inserts file contents into the module tree for specified import paths. This fixes
			 * issues on Vite halting when it encounters Deno-specific import paths. Code inspired
			 * from alex-kinokon/rollup-plugin-ignore.
			 */
			const defaultFileContent = 'export default {}'
			const placeholderFilename = '\0__rollup_plugin_filter_placeholder__\0'

			return {
				name: 'filter-std-imports',
				resolveId(source: string | undefined) {
					if (source?.startsWith('std/')) {
						return placeholderFilename
					}

					return null
				},
				load(id: string) {
					if (id === placeholderFilename) {
						return defaultFileContent
					}

					return null
				},
			}
		})(),
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

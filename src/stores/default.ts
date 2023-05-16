import { defineStore } from 'pinia'

import { useApi3, type BareAppRouter } from '@quasipanacea/common/trpcClient.ts'

const api = useApi3<BareAppRouter>()

const data = await api.core.pluginList.query()

export const useDefaultStore = defineStore('default', {
	state: () => {
		const plugins = data.plugins
			.filter((plugin) => plugin.kind === 'overview')
			.map((plugin) => plugin.id)

		const currentPlugin = plugins[0]

		return {
			plugins,
			currentPlugin,
		}
	},
	actions: {
		setCurrentPlugin(plugin: string) {
			this.currentPlugin = plugin
		},
	},
})

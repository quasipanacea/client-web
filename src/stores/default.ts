import { defineStore } from 'pinia'

import { apiObj as api } from '@common/trpcClient'

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

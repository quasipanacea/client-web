import { defineStore } from 'pinia'

import { api } from '@/util/api'

export const usePluginsStore = defineStore('plugins', {
	state: async () => {
		const data = await api.pluginList.query()

		const plugins = data.plugins
			.filter((plugin) => plugin.kind === 'overview')
			.map((plugin) => plugin.id)

		const currentPlugin = data.plugins[0].id

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

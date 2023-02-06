import { defineStore } from 'pinia'

import { tc } from '@/util/trpc'

const data = await tc.pluginList.query()

export const usePluginsStore = defineStore('plugins', {
	state: () => {
		const plugins = data.plugins
			.filter((item) => item.resource === 'overviews')
			.map((item) => item.name)

		const currentPlugin = data.plugins[0].name

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

import { defineStore } from 'pinia'

import * as apiv3 from '@/util/apiv3'

const data = await apiv3.pluginList({})

export const usePluginsStore = defineStore('plugins', {
	state: () => {
		const plugins = data.plugins
			.filter((item) => item.resource === 'overviews')
			.map((item) => item.name)

		const currentPlugin = data.plugins[0]

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

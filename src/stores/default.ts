import { defineStore } from 'pinia'

import {
	trpcClient,
	type BareAppRouter,
} from '@quasipanacea/common/client/index.js'

const api = trpcClient.yieldClient<BareAppRouter>()

const data = await api.core.pluginList.query({ kind: 'overview' })

export const useDefaultStore = defineStore('default', {
	state: () => {
		const plugins = data.plugins.map((plugin) => plugin.id)

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

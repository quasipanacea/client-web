import { defineStore } from 'pinia'

export const currentOverviewDefault = 'OverviewPod'

export const usePluginsStore = defineStore('plugins', {
	state: () => {
		const plugins = [
			'OverviewHier',
			'OverviewPod',
			'OverviewGraph',
			'OverviewDebug',
			'OverviewNull',
		]
		const currentPlugin = currentOverviewDefault

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

import { defineStore } from 'pinia'

export const currentOverviewDefault = 'OverviewHier'

export const usePluginsStore = defineStore('plugins', {
	state: () => {
		const plugins = [
			'OverviewHier',
			'OverviewDragAndDrop',
			'OverviewRaw',
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

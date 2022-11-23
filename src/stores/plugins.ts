import { defineStore } from 'pinia'

export const currentPluginDefault = 'PanePlugin'

export const usePluginsStore = defineStore('plugins', {
	state: () => {
		const plugins = [
			'DragAndDropPlugin',
			'PanePlugin',
			'ListPlugin',
			'TreePlugin',
		]
		const currentPlugin = currentPluginDefault

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

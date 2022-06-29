import { defineStore } from 'pinia'

export const currentPluginDefault = 'ListPlugin'

export const usePluginsStore = defineStore('plugins', {
	state: () => {
		const plugins = [
			'DragAndDropPlugin',
			'ExamplePlugin',
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

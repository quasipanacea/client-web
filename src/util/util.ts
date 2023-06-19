import { getPlugins } from "@quasipanacea/common/client/plugin.ts"

import { initAll } from '@quasipanacea/pack-core/_client.js'

export async function initPlugins() {
	await initAll()
}

export async function importOverview(pluginId: string): Promise<unknown> {
	const { overviewPlugins } = await getPlugins()

	const plugin = overviewPlugins.get(pluginId)
	if (!plugin) {
		throw new Error(`Failed to find overview plugin with id: ${pluginId}`)
	}

	return plugin.component
}

export async function importPod(pluginId: string): Promise<unknown> {
	const { podPlugins } = await getPlugins()

	const plugin = podPlugins.get(pluginId)
	if (!plugin) {
		throw new Error(`Failed to find pod plugin with id: ${pluginId}`)
	}

	return plugin.component
}

export async function importModel(pluginId: string): Promise<unknown> {
	const { modelPlugins } = await getPlugins()

	const plugin = modelPlugins.get(pluginId)
	if (!plugin) {
		throw new Error(`Failed to find model plugin with id: ${pluginId}`)
	}

	return plugin.component
}

export async function importView(pluginId: string): Promise<unknown> {
	const { viewPlugins } = await getPlugins()

	const plugin = viewPlugins.get(pluginId)
	if (!plugin) {
		throw new Error(`Failed to find view plugin with id: ${pluginId}`)
	}

	return plugin.component
}

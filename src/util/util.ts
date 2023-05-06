import {
	overviewPlugins,
	podPlugins,
	modelPlugins,
	groupPlugins,
	coverPlugins,
} from '@quasipanacea/pack-core/_client.js'

export async function importOverview(pluginId: string): Promise<unknown> {
	for (const overviewPlugin of overviewPlugins) {
		if (overviewPlugin.metadata.id === pluginId) {
			return overviewPlugin.component
		}
	}

	throw new Error(`Failed to find overview with id: ${pluginId}`)
}

export async function importPod(pluginId: string): Promise<unknown> {
	for (const podPlugin of podPlugins) {
		if (podPlugin.metadata.id === pluginId) {
			return podPlugin.component
		}
	}

	throw new Error(`Failed to find pod with id: ${pluginId}`)
}

export async function importModel(pluginId: string): Promise<unknown> {
	for (const modelPlugin of modelPlugins) {
		if (modelPlugin.metadata.id === pluginId) {
			return modelPlugin.component
		}
	}

	throw new Error(`Failed to find model with id: ${pluginId}`)
}

export async function importGroup(pluginId: string): Promise<unknown> {
	for (const groupPlugin of groupPlugins) {
		if (groupPlugin.metadata.id === pluginId) {
			return groupPlugin.component
		}
	}

	throw new Error(`Failed to find group with id: ${pluginId}`)
}

export async function importCover(pluginId: string): Promise<unknown> {
	for (const coverPlugin of coverPlugins) {
		if (coverPlugin.metadata.id === pluginId) {
			return coverPlugin.component
		}
	}

	throw new Error(`Failed to find cover with id: ${pluginId}`)
}

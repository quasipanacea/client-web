export async function importGroup(pluginId: string): Promise<unknown> {
	const camelCased = pluginId.replace(/-([a-z])/g, function (g) {
		return g[1].toUpperCase()
	})
	const filename = 'Group' + camelCased[0].toUpperCase() + camelCased.slice(1)

	const module = (
		await import(`../../common/resource-symlinks/group/${filename}.vue`)
	).default

	return module
}

export async function importCover(pluginId: string): Promise<unknown> {
	const camelCased = pluginId.replace(/-([a-z])/g, function (g) {
		return g[1].toUpperCase()
	})
	const filename = 'Cover' + camelCased[0].toUpperCase() + camelCased.slice(1)

	const module = (
		await import(`../../common/resource-symlinks/cover/${filename}.vue`)
	).default

	return module
}

export async function importOverview(pluginId: string): Promise<unknown> {
	const camelCased = pluginId.replace(/-([a-z])/g, function (g) {
		return g[1].toUpperCase()
	})
	const filename =
		'Overview' + camelCased[0].toUpperCase() + camelCased.slice(1)

	const module = (
		await import(`../../common/resource-symlinks/overviews/${filename}.vue`)
	).default

	return module
}

export async function importPod(pluginId: string): Promise<unknown> {
	const camelCased = pluginId.replace(/-([a-z])/g, function (g) {
		return g[1].toUpperCase()
	})
	const filename = 'Pod' + camelCased[0].toUpperCase() + camelCased.slice(1)

	const module = (
		await import(`../../common/resource-symlinks/pods/${filename}.vue`)
	).default

	return module
}

export function loadPluginVueComponents() {
	const modules = import.meta.glob('../../common/plugins/**/PodView.vue')

	return modules
}

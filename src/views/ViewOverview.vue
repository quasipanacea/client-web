<template>
	<component v-if="currentModule" :is="currentModule" />
</template>

<script lang="ts">
import { defineComponent, onMounted, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import { usePluginsStore } from '@/stores/plugins'

export default defineComponent({
	props: {
		pluginName: String,
	},
	setup(props) {
		const router = useRouter()
		const pluginStore = usePluginsStore()
		const currentModule = shallowRef(null)

		async function set(name: string) {
			const camelCased = name.replace(/-([a-z])/g, function (g) {
				return g[1].toUpperCase()
			})
			const filename =
				'Overview' + camelCased[0].toUpperCase() + camelCased.slice(1)

			const module = (
				await import(`../../common/resource-symlinks/overviews/${filename}.vue`)
			).default
			currentModule.value = module
		}

		onMounted(async () => {
			if (!props.pluginName) return
			await set(props.pluginName)
			pluginStore.currentPlugin = props.pluginName
		})
		// watch(router.currentRoute, (value) => {
		// 	pluginStore.currentPlugin = value
		// })
		pluginStore.$subscribe(async (_, state) => {
			router.push({
				path: `/overview/${state.currentPlugin}`,
			})
			await set(state.currentPlugin)
		})

		return {
			currentModule,
		}
	},
})
</script>

<style scoped>
.plugin-root {
	padding: 10px;
}
</style>

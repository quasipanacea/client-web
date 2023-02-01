<template>
	<component v-if="currentModule" :is="currentModule" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { usePluginsStore } from '@/stores/plugins'

export default defineComponent({
	props: {
		pluginName: String,
	},
	setup(props) {
		const router = useRouter()

		const currentModule = ref(null)

		onMounted(async () => {
			const module = (
				await import(`../../common/symlinks/overviews/${props.pluginName}.vue`)
			).default
			console.log('module', module)
			currentModule.value = module
		})

		const pluginStore = usePluginsStore()
		pluginStore.$subscribe((mutation, state) => {
			router.push({
				path: `/overview/${state.currentPlugin}`,
			})
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

<template>
	<UniversePluginWrapper :pluginName="$props.pluginName" />
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { usePluginsStore } from '../stores/plugins'
import UniversePluginWrapper from '../components/plugin-wrappers/UniverseWrapper.vue'
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		pluginName: String,
	},
	setup() {
		const router = useRouter()

		const pluginStore = usePluginsStore()
		pluginStore.$subscribe((mutation, state) => {
			router.push({
				path: `/universe/${state.currentPlugin}`,
			})
		})
	},
	components: {
		UniversePluginWrapper,
	},
})
</script>

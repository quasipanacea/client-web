<template>
	<PluginOverview :pluginName="$props.pluginName" class="plugin-root" />
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { usePluginsStore } from '../stores/plugins'
import PluginOverview from '../components/plugins/PluginOverview.vue'
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
				path: `/overview/${state.currentPlugin}`,
			})
		})
	},
	components: {
		PluginOverview,
	},
})
</script>

<style scoped>
.plugin-root {
	padding: 30px;
}
</style>

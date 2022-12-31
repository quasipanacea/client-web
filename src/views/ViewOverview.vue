<template>
	<OverviewHier
		v-if="$props.pluginName === 'OverviewHier'"
		class="plugin-root"
	/>
	<OverviewExperimentalPod
		v-else-if="$props.pluginName === 'OverviewExperimentalPod'"
		class="plugin-root"
	/>
	<OverviewRaw
		v-else-if="$props.pluginName === 'OverviewRaw'"
		class="plugin-root"
	/>
	<OverviewNull v-else class="plugin-root" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import { usePluginsStore } from '@/stores/plugins'
import OverviewHier from '@/components/plugins/overview/OverviewHier.vue'
import OverviewExperimentalPod from '@/components/plugins/overview/OverviewExperimentalPod.vue'
import OverviewRaw from '@/components/plugins/overview/OverviewRaw.vue'
import OverviewNull from '@/components/plugins/overview/OverviewNull.vue'

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
		OverviewHier,
		OverviewExperimentalPod,
		OverviewRaw,
		OverviewNull,
	},
})
</script>

<style scoped>
.plugin-root {
	padding: 30px;
}
</style>

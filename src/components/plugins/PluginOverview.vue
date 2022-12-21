<template>
	<OverviewHier v-if="$props.pluginName === 'OverviewHier'" />
	<OverviewExperimentalPod
		v-else-if="$props.pluginName === 'OverviewExperimentalPod'"
	/>
	<OverviewRaw v-else-if="$props.pluginName === 'OverviewRaw'" />
	<OverviewNull v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import OverviewHier from '@/components/plugins/overview/OverviewHier.vue'
import OverviewExperimentalPod from './overview/OverviewExperimentalPod.vue'
import OverviewRaw from '@/components/plugins/overview/OverviewRaw.vue'
import OverviewNull from '@/components/plugins/overview/OverviewNull.vue'

export default defineComponent({
	props: {
		pluginName: String,
	},
	components: {
		OverviewHier,
		OverviewExperimentalPod,
		OverviewRaw,
		OverviewNull,
	},
})
</script>

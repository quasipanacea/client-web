<template>
	<OverviewHier v-if="$props.pluginName === 'OverviewHier'" />
	<OverviewDragAndDrop
		v-else-if="$props.pluginName === 'OverviewDragAndDrop'"
	/>
	<OverviewRaw v-else-if="$props.pluginName === 'OverviewRaw'" />
	<OverviewNull v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import OverviewHier from '@/components/plugins/overview/OverviewHier.vue'
import OverviewDragAndDrop from '@/components/plugins/overview/OverviewDragAndDrop.vue'
import OverviewRaw from '@/components/plugins/overview/OverviewRaw.vue'
import OverviewNull from '@/components/plugins/overview/OverviewNull.vue'

export default defineComponent({
	props: {
		pluginName: String,
	},
	components: {
		OverviewHier,
		OverviewDragAndDrop,
		OverviewRaw,
		OverviewNull,
	},
})
</script>

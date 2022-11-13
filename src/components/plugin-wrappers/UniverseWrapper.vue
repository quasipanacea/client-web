<template>
	<DragAndDropUniversePlugin
		class="plugin-root"
		v-if="$props.pluginName === 'DragAndDropPlugin'"
	/>
	<PaneUniversePlugin
		class="plugin-root"
		v-else-if="$props.pluginName === 'PanePlugin'"
	/>
	<ListUniversePlugin
		class="plugin-root"
		v-else-if="$props.pluginName === 'ListPlugin'"
	/>
	<TreeUniversePlugin
		class="plugin-root"
		v-else-if="$props.pluginName === 'TreePlugin'"
	/>
	<NullUniversePlugin class="plugin-root" v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DragAndDropUniversePlugin from '@/components/plugins/universe/DragAndDropPlugin.vue'
import PaneUniversePlugin from '@/components/plugins/universe/PanePlugin.vue'
import ListUniversePlugin from '@/components/plugins/universe/ListPlugin.vue'
import NullUniversePlugin from '@/components/plugins/universe/NullPlugin.vue'
import TreeUniversePlugin from '@/components/plugins/universe/TreePlugin.vue'

export default defineComponent({
	props: {
		pluginName: String,
	},
	components: {
		DragAndDropUniversePlugin,
		PaneUniversePlugin,
		ListUniversePlugin,
		NullUniversePlugin,
		TreeUniversePlugin,
	},
})
</script>

<style scoped>
.plugin-root {
	padding: 30px;
}
</style>

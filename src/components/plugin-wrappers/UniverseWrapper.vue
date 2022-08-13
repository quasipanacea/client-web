<template>
	<DragAndDropUniversePlugin
		class="plugin-root"
		v-if="$props.pluginName === 'DragAndDropPlugin'"
	/>
	<ExampleUniversePlugin
		class="plugin-root"
		v-else-if="$props.pluginName === 'ExamplePlugin'"
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
import ExampleUniversePlugin from '@/components/plugins/universe/ExamplePlugin.vue'
import ListUniversePlugin from '@/components/plugins/universe/ListPlugin.vue'
import NullUniversePlugin from '@/components/plugins/universe/NullPlugin.vue'
import TreeUniversePlugin from '@/components/plugins/universe/TreePlugin.vue'

export default defineComponent({
	props: {
		pluginName: String,
	},
	components: {
		DragAndDropUniversePlugin,
		ExampleUniversePlugin,
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

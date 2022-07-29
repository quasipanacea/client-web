<script setup lang="ts">
import DragAndDropUniversePlugin from '@/components/plugins/universe/DragAndDropPlugin.vue'
import ExampleUniversePlugin from '@/components/plugins/universe/ExamplePlugin.vue'
import ListUniversePlugin from '@/components/plugins/universe/ListPlugin.vue'
import NullUniversePlugin from '@/components/plugins/universe/NullPlugin.vue'
import TreeUniversePlugin from '@/components/plugins/universe/TreePlugin.vue'

const props = defineProps<{
	pluginName?: string
}>()
</script>

<template>
	<DragAndDropUniversePlugin v-if="props.pluginName === 'DragAndDropPlugin'" />
	<ExampleUniversePlugin v-else-if="props.pluginName === 'ExamplePlugin'" />
	<ListUniversePlugin v-else-if="props.pluginName === 'ListPlugin'" />
	<TreeUniversePlugin v-else-if="props.pluginName === 'TreePlugin'" />
	<NullUniversePlugin v-else />
</template>

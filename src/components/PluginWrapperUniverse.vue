<script setup lang="ts">
import DragAndDropUniversePlugin from '@/plugins/universe/DragAndDropUniversePlugin.vue'
import ExampleUniversePlugin from '@/plugins/universe/ExampleUniversePlugin.vue'
import ListUniversePlugin from '@/plugins/universe/ListUniversePlugin.vue'
import NullUniversePlugin from '@/plugins/universe/NullUniversePlugin.vue'
import TreeUniversePlugin from '@/plugins/universe/TreeUniversePlugin.vue'

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

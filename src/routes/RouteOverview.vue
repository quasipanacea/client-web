<template>
	<div style="height: 100%; width: 100%; overflow: hidden;"> <!-- TODO: display: content -->
		<component v-if="currentOverview" :is="currentOverview" />
		<p v-else>Loading...</p>
		<!-- TODO: do Loading... with other routes-->
	</div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef, watch, toRef } from 'vue'
import { useRouter } from 'vue-router'

import { pluginClient } from '@quasipanacea/common/client/index.js'

import { useDefaultStore } from '@client/stores/default.js'

const props = defineProps<{
	plugin: string
}>()

const router = useRouter()
const currentOverview = shallowRef<unknown>()
const defaultStore = useDefaultStore()
const slice = (id: string) => id.slice('overview'.length + 1)

watch(toRef(defaultStore, 'currentPlugin'), async (value) => {
	router.push({
		path: `/overview/${slice(value)}`,
	})
	updateCurrentOverview(value)
})

onMounted(() => {
	updateCurrentOverview(props.plugin)
})

function updateCurrentOverview(id: string) {
	id = 'overview.' + id
	const plugin = pluginClient.get(id)

	if (!plugin?.overview?.component) {
		throw new Error(`Plugin with id: ${id} does not export overview.component`)
	}

	currentOverview.value = plugin.overview.component
}
</script>

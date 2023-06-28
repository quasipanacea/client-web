<template>
	<component v-if="currentModule" :is="currentModule" />
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'

import {
	pluginClient,
	trpcClient,
	type BareAppRouter,
} from '@quasipanacea/common/client/index.js'

const props = defineProps<{
	viewUuid: string
}>()

const api = trpcClient.yieldClient<BareAppRouter>()

const currentModule = shallowRef<unknown>()

async function updateModule(viewUuid: string) {
	const { views } = await api.core.viewList.query()
	const currentView = views.find((item) => item.uuid === viewUuid)
	if (!currentView) throw new Error('currentCollection is undefined')

	currentModule.value = pluginClient.get('view', currentView.plugin).component
}

onMounted(async () => {
	if (!props.viewUuid) return
	await updateModule(props.viewUuid)
})
</script>

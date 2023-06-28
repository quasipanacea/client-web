<template>
	<component v-if="currentModule" :is="currentModule" :uuid="modelUuid" />
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'

import {
	pluginClient,
	trpcClient,
	type BareAppRouter,
} from '@quasipanacea/common/client/index.js'

const props = defineProps<{
	modelUuid: string
}>()

const api = trpcClient.yieldClient<BareAppRouter>()

const currentModule = shallowRef<unknown>()

async function updateModule(viewUuid: string) {
	const { models } = await api.core.modelList.query()
	const currentModel = models.find((item) => item.uuid === viewUuid)
	if (!currentModel) throw new Error('currentCollection is undefined')

	currentModule.value = pluginClient.get('model', currentModel.plugin).component
}

onMounted(async () => {
	if (!props.modelUuid) return
	await updateModule(props.modelUuid)
})
</script>

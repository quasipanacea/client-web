<template>
	<component v-if="currentModule" :is="currentModule" :uuid="modelUuid" />
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'

import { t } from '@quasipanacea/common/index.js'
import {
	pluginClient,
	trpcClient,
	type BareAppRouter,
} from '@quasipanacea/common/client/index.js'

const props = defineProps<{
	modelUuid: string
}>()
const api = trpcClient.yieldClient<BareAppRouter>()

const currentModel = ref<t.Model_t | null>(null)
const currentModule = shallowRef<unknown>()

onMounted(async () => {
	await updateData()
})
async function updateData() {
	const model = (await api.core.modelList.query()).models.find(
		(item) => item.uuid === props.modelUuid,
	)
	if (!model) {
		throw new Error(`Failed to find pod: ${props.modelUuid}`)
	}

	const settingsJson = await api.core.settingsGet.query()
	const modelviewId = settingsJson.modelviewMimes?.[model.format]
	if (!modelviewId) {
		throw new Error(
			`Failed to find podviewId with pod uuid ${model.uuid} and pod format ${model.format}`,
		)
	}

	const plugin = pluginClient.get('modelview', modelviewId)

	currentModel.value = model
	currentModule.value = plugin.component
}
</script>

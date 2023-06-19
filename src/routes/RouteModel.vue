<template>
	<div style="height: 100%; position: relative">
		<div style="position: absolute; inset: 0">
			<component v-if="currentModule" :is="currentModule" :uuid="modelUuid" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'

import {
	getPlugin,
	useApi3,
	type BareAppRouter,
} from '@quasipanacea/common/client/index.js'

const props = defineProps<{
	modelUuid: string
}>()

const api = useApi3<BareAppRouter>()

const currentModule = shallowRef<unknown>()

async function updateModule(viewUuid: string) {
	const { models } = await api.core.modelList.query()
	const currentModel = models.find((item) => item.uuid === viewUuid)
	if (!currentModel) throw new Error('currentCollection is undefined')

	currentModule.value = getPlugin('model', currentModel.plugin).component
}

onMounted(async () => {
	if (!props.modelUuid) return
	await updateModule(props.modelUuid)
})
</script>

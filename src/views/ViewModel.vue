<template>
	<div>
		<h1 class="title">Model</h1>
		<div
			style="
				position: absolute;
				top: 30px;
				left: 0;
				width: 100%;
				height: calc(100% - 30px);
			"
		>
			<component v-if="currentModule" :is="currentModule" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'

import { api } from '@client/util/api.js'
import * as util from '@client/util/util.js'

const props = defineProps<{
	modelUuid: string
}>()

const currentModule = shallowRef<unknown>()

async function updateModule(coverUuid: string) {
	const { models } = await api.core.modelList.query()
	const currentModel = models.find((item) => item.uuid === coverUuid)
	if (!currentModel) throw new Error('currentCollection is undefined')

	currentModule.value = await util.importModel(currentModel.plugin)
}

onMounted(async () => {
	if (!props.modelUuid) return
	await updateModule(props.modelUuid)
})
</script>

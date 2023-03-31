<template>
	<div>
		<h1>Cover</h1>
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
	coverUuid: string
}>()

const currentModule = shallowRef<unknown>()

async function updateModule(coverUuid: string) {
	const { covers } = await api.core.coverList.query()
	const currentCover = covers.find((item) => item.uuid === coverUuid)
	if (!currentCover) throw new Error('currentCollection is undefined')

	currentModule.value = await util.importCover(currentCover.pluginId)
}

onMounted(async () => {
	if (!props.coverUuid) return
	await updateModule(props.coverUuid)
})
</script>

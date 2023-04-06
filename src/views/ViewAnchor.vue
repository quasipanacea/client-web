<template>
	<div>
		<h1 class="title">Anchor</h1>
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
	anchorUuid: string
}>()

const currentModule = shallowRef<unknown>()

async function updateModule(coverUuid: string) {
	const { anchors } = await api.core.anchorList.query()
	const currentAnchor = anchors.find((item) => item.uuid === coverUuid)
	if (!currentAnchor) throw new Error('currentCollection is undefined')

	currentModule.value = await util.importAnchor(currentAnchor.plugin)
}

onMounted(async () => {
	if (!props.anchorUuid) return
	await updateModule(props.anchorUuid)
})
</script>

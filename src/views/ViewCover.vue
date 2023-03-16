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
import { onMounted, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import { api } from '@/util/api'
import * as util from '@/util/util'
import { useDefaultStore } from '@/stores/default.js'

const props = defineProps<{
	coverUuid: string
}>()

const currentModule = shallowRef<null | unknown>(null)

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

<template>
	<div>
		<h1>View</h1>
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

import { useApi3, type BareAppRouter } from '@quasipanacea/common/trpcClient.ts'
import * as util from '@client/util/util.js'

const props = defineProps<{
	viewUuid: string
}>()

const api = useApi3<BareAppRouter>()

const currentModule = shallowRef<unknown>()

async function updateModule(viewUuid: string) {
	const { views } = await api.core.viewList.query()
	const currentView = views.find((item) => item.uuid === viewUuid)
	if (!currentView) throw new Error('currentCollection is undefined')

	currentModule.value = await util.importView(currentView.plugin)
}

onMounted(async () => {
	if (!props.viewUuid) return
	await updateModule(props.viewUuid)
})
</script>

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

import {
	getPlugin,
	useApi3,
	type BareAppRouter,
} from '@quasipanacea/common/client/index.js'

const props = defineProps<{
	viewUuid: string
}>()

const api = useApi3<BareAppRouter>()

const currentModule = shallowRef<unknown>()

async function updateModule(viewUuid: string) {
	const { views } = await api.core.viewList.query()
	const currentView = views.find((item) => item.uuid === viewUuid)
	if (!currentView) throw new Error('currentCollection is undefined')

	currentModule.value = getPlugin('view', currentView.plugin).component
}

onMounted(async () => {
	if (!props.viewUuid) return
	await updateModule(props.viewUuid)
})
</script>

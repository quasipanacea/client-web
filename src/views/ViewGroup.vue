<template>
	<div>
		<h1>Group</h1>
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
	groupUuid: string
}>()

const currentModule = shallowRef<unknown>()

async function updateModule(groupUuid: string) {
	const { groups } = await api.core.groupList.query()
	const currentGroup = groups.find((item) => item.uuid === groupUuid)
	if (!currentGroup) throw new Error('currentCollection is undefined')

	currentModule.value = await util.importGroup(currentGroup.pluginId)
}

onMounted(async () => {
	if (!props.groupUuid) throw new Error(`Failed to pass groupUuid`)

	await updateModule(props.groupUuid)
})
</script>

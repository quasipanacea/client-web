<template>
	<div>
		<h1>Collection</h1>
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
import { useRouter } from 'vue-router'

import { api } from '@/util/api'
import { useDefaultStore } from '@/stores/default.js'

const props = defineProps<{
	groupUuid: string
}>()

const currentModule = shallowRef(null)

async function set(groupUuid: string) {
	const { collections } = await api.core.collectionList.query()
	const currentCollection = collections.find((item) => item.uuid === groupUuid)
	if (!currentCollection) throw new Error('currentCollection is undefined')

	const camelCased = currentCollection.pluginId.replace(
		/-([a-z])/g,
		function (g) {
			return g[1].toUpperCase()
		},
	)
	const filename = 'Group' + camelCased[0].toUpperCase() + camelCased.slice(1)

	const module = (
		await import(`../../common/resource-symlinks/group/${filename}.vue`)
	).default
	currentModule.value = module
}

onMounted(async () => {
	if (!props.groupUuid) return
	await set(props.groupUuid)
})
</script>

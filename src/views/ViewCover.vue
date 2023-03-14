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
import { useDefaultStore } from '@/stores/default.js'

const props = defineProps<{
	coverUuid: string
}>()

const router = useRouter()
const defaultStore = useDefaultStore()
const currentModule = shallowRef(null)

async function set(coverUuid: string) {
	const { covers } = await api.core.coverList.query()
	const currentCover = covers.find((item) => item.uuid === coverUuid)
	if (!currentCover) throw new Error('currentCollection is undefined')
	console.log(currentCover)
	const camelCased = currentCover.pluginId.replace(/-([a-z])/g, function (g) {
		return g[1].toUpperCase()
	})
	const filename = 'Cover' + camelCased[0].toUpperCase() + camelCased.slice(1)

	const module = (
		await import(`../../common/resource-symlinks/cover/${filename}.vue`)
	).default
	currentModule.value = module
}

onMounted(async () => {
	if (!props.coverUuid) return
	await set(props.coverUuid)
})
</script>

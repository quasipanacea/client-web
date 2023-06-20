<template>
	<component v-if="currentOverview" :is="currentOverview" />
</template>

<script setup lang="ts">
import { onMounted, shallowRef, watch, toRef } from 'vue'
import { useRouter } from 'vue-router'

import { getPlugin } from '@quasipanacea/common/client'

import { useDefaultStore } from '@client/stores/default.js'

const props = defineProps<{
	plugin: string
}>()

const router = useRouter()
const currentOverview = shallowRef<unknown>()
const defaultStore = useDefaultStore()

watch(toRef(defaultStore, 'currentPlugin'), async (value) => {
	router.push({
		path: `/overview/${value}`,
	})
	await updateCurrentOverview(value)
})

onMounted(() => {
	updateCurrentOverview(props.plugin)
})

function updateCurrentOverview(name: string) {
	currentOverview.value = getPlugin('overview', name).component
}
</script>

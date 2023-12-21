<template>
	<p>Redirecting...</p>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import {
	trpcClient,
	type BareAppRouter,
	pluginClient,
} from '@quasipanacea/common/client/index.ts'

const router = useRouter()
const api = trpcClient.yieldClient<BareAppRouter>()

onBeforeMount(async () => {
	const slice = (id: string) => id.slice('overview'.length + 1)
	const settingsJson = await api.core.settingsGet.query()
	if (settingsJson.defaultOverviewPlugin) {
		router.push(`/overview/${slice(settingsJson.defaultOverviewPlugin)}`)
	} else {
		const overviewId = (pluginClient.list('overview')).map(
			(item) => item.metadata.id,
		)[0]
		router.push(`/overview/${slice(overviewId)}`)
	}
})
</script>

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
	const settingsJson = await api.core.settingsGet.query()
	if (settingsJson.defaultOverview) {
		router.push(`/overview/${settingsJson.defaultOverview}`)
	} else {
		const overviewId = (await pluginClient.list('overview')).map(
			(item) => item.metadata.id,
		)[0]
		router.push(`/overview/${overviewId}`)
	}
})
</script>

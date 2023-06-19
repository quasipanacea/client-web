<template>
	<div>
		<router-link to="/">
			<button class="button is-primary">Back</button>
		</router-link>
		<h1>Plugins</h1>
		<p>Currently loaded plugins</p>
		<textarea v-model="data"></textarea>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { plugin, useApi3, type BareAppRouter } from '@quasipanacea/common/client/index.js'

const api = useApi3<BareAppRouter>()

const data = ref('')
onMounted(async () => {
	const res = await api.core.pluginList.query()
	data.value = JSON.stringify(res.plugins, null, '\t')

	const plugins = await pluginManager.getPlugins()
	console.log(plugins)
})
</script>

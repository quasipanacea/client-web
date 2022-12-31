<template>
	<div>
		<h1>Pods</h1>
		<div v-for="plugin of podPlugins" :key="plugin.plugin.name">
			<template v-if="plugin.pods.length > 0">
				<h2>Type: {{ plugin.pods[0].type }}</h2>
				<ul v-for="pod in plugin.pods" :key="pod.uuid">
					<li>
						<RouterLink :to="'/pod/' + pod.uuid">{{ pod.name }}</RouterLink>
					</li>
				</ul>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import type * as schema from '../../../../common/schemaV2'
import * as api from '@/util/clientApiV2'
import { RouterLink } from 'vue-router'

export default defineComponent({
	setup() {
		const podPlugins = ref<
			{
				plugin: schema.podListPlugins_resT['plugins'][0]
				pods: schema.podList_resT['pods']
			}[]
		>([])
		;(async () => {
			const result = await api.podListPlugins({})
			for (const plugin of result.plugins) {
				const { pods } = await api.podList({
					type: plugin.type,
				})
				podPlugins.value.push({ plugin, pods })
			}
		})()
		return {
			podPlugins,
		}
	},
	components: { RouterLink },
})
</script>

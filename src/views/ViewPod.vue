<template>
	<div>
		<h1>Pod</h1>
		<RouterLink to="/overview/OverviewExperimentalPod">Back</RouterLink>
		<template v-if="queryResult">
			<p>uuid: {{ queryResult.name }}</p>
			<p>name: {{ queryResult.name }}</p>
		</template>
		<!-- <component :is="comp" /> -->
		<markdown v-if="comp === 'markdown'" />
		<pt v-else-if="comp === 'plaintext'" />
		<nulll v-else />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type * as schema from '../../common/schemaV2'
import * as api from '../util/clientApiV2'

import nulll from '@/components/PodNull.vue'
import markdown from '../../common/plugins/Core/PodMarkdown/PodView.vue'
import plaintext from '../../common/plugins/Core/PodPlaintext/PodView.vue'

export default defineComponent({
	props: {
		uuid: String,
	},
	components: {
		markdown,
		pt: plaintext,
		nulll,
	},
	setup(props) {
		const queryResult = ref<schema.podQuery_resT>({ wraps: '', name: '' })
		const comp = ref('nulll')

		;(async () => {
			if (!props.uuid) {
				throw new Error('uuid is not truthy')
			}

			queryResult.value = await api.podQuery({ uuid: props.uuid })
			comp.value = queryResult.value.wraps
		})()

		return {
			queryResult,
			comp,
		}
	},
})
</script>

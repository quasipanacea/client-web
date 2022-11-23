<template>
	<table>
		<br
	</table>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import * as api from '@/util/clientApiV2'

export default defineComponent({
	setup() {
		const topics = ref<string[]>([])

		async function loadTopics() {
			const area = 'seven'
			const result = await api.topicList({ area })
			if (!result) return

			topics.value = result.topics
		}

		return {
			topics,
		}
	},
})
</script>

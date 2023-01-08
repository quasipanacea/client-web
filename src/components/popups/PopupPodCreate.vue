<template>
	<div class="form">
		<h1>Create New Pod</h1>
		<FormKit
			type="text"
			label="Name:"
			validation="length:1"
			v-model="podName"
		/>
		<div>Type:</div>
		<select v-model="podType">
			<option v-for="item in podTypes" :value="item.label" :key="item.value">
				{{ item.value }}
			</option>
		</select>
		<div></div>
		---
		<FormKit type="submit" @click="onCreate">New Pod</FormKit>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import * as api from '@/util/clientApiV2'
import { popupEmitter } from '@/util/popupSimple'

export default defineComponent({
	props: {
		id: String,
	},
	setup(props) {
		const podTypes = ref<{ label: string; value: string }[]>([])

		;(async () => {
			const { plugins } = await api.podListPlugins({})
			podTypes.value = plugins.map(({ name, namePretty }) => ({
				label: namePretty,
				value: name,
			}))
		})()

		const podName = ref('')
		const podType = ref('')

		function onCreate() {
			if (!podName.value || !podType.value) return

			popupEmitter.emit('new-pod::close', {
				name: podName.value,
				type: podType.value,
			})
		}

		return {
			podTypes,
			podName,
			podType,
			onCreate,
		}
	},
})
</script>

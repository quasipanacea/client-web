<template>
	<h1>Document</h1>
	<router-link to="/universe">Back</router-link>
	<br />
	<textarea
		v-model="documentText"
		@keypress="saveDocument()"
		rows="60"
	></textarea>
</template>

<script setup lang="ts">
import { onDeactivated, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { debounce } from 'lodash'

const route = useRoute()

let documentText = ref('fff')

const saveDocument = debounce(async () => {
	const res = await fetch('/api/document/write', {
		method: 'POST',
		body: JSON.stringify({
			name: route.fullPath.split('/').at(-1),
			content: documentText.value,
		}),
	})

	if (!res.ok) {
		console.log(await res.json())
		return
	}
}, 300)

onMounted(async () => {
	const res = await fetch('/api/document/read', {
		method: 'POST',
		body: JSON.stringify(
			{
				name: route.fullPath.split('/').at(-1),
			},
			null,
			'\t',
		),
	})
	if (!res.ok) {
		const err = await res.json()
		console.log('error', err)
		return
	}

	const json = await res.json()
	documentText.value = json.content
})
</script>

<style scoped>
textarea {
	width: 800px;
}
</style>

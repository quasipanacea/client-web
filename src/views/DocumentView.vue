<template>
	<div class="container">
		<header class="header">
			<h1 class="title">Document</h1>
			<router-link to="/universe">Back</router-link>
		</header>

		<textarea v-model="documentText" @keypress="saveDocument()"></textarea>
	</div>
</template>

<script setup lang="ts">
import { onDeactivated, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { debounce } from 'lodash'

const route = useRoute()

let documentText = ref('')

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
.container {
	display: grid;
	grid-template-rows: auto 1fr;
	height: 100%;
}

.header {
}

.title {
	display: inline;
}

textarea {
	width: 100%;
	height: 100%;
}
</style>

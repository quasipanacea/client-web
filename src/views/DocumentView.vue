<template>
	<div class="container">
		<header class="header">
			<h1 class="title">Document</h1>
			<router-link to="/universe">Back</router-link>
		</header>

		<textarea v-model="documentText" @keypress="saveDocument()"> </textarea>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { debounce } from 'lodash'
import * as api from '@/util/clientApi'

const route = useRoute()

const documentText = ref('')

const saveDocument = debounce(async () => {
	const documentId = route.fullPath.split('/').at(-1)
	if (!documentId) throw new Error('documentId is undefined')

	await api.writeDocument(documentId, documentText.value)
}, 300)

onMounted(async () => {
	const documentId = route.fullPath.split('/').at(-1)
	if (!documentId) throw new Error('documentId is undefined')

	const json = await api.readDocument(documentId)
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

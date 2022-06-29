<template>
	<div class="plugin-root">
		<FormKit
			type="text"
			label="Document Name"
			value="original"
			help="Name"
			v-model="userDocumentName"
			minlength="1"
		/>
		<FormKit
			type="button"
			label="New Document"
			@click="createNewDocument(userDocumentName)"
		>
		</FormKit>
		<table class="table">
			<thead>
				<tr>
					<th>Documents</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="document of documents" :key="document.name">
					<th>
						<router-link :to="`/document/${document.name}`">{{
							document.name
						}}</router-link>
					</th>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const el = ref()

let userDocumentName = ref('')

let documentsTitle = ref({})
let documents = ref({})

let globals = reactive({ documentsDir: '' })

function fetchw() {}

onMounted(async () => {
	const appData = await (
		await fetch('/api/meta', {
			method: 'POST',
		})
	).json()
	globals.documentsDir = appData.documentsDir

	await refetchDocuments()
})

async function refetchDocuments() {
	const data = await (
		await fetch('/api/document/list', {
			method: 'POST',
		})
	).json()
	documentsTitle.value = data.documentsKeys
	documents.value = data.documents
}

async function createNewDocument(documentId: string) {
	const data = await fetch('/api/document/create', {
		method: 'POST',
		body: JSON.stringify(
			{
				documentId,
			},
			null,
			'\t',
		),
	})
	if (!data.ok) {
		try {
			const jsonData = await data.json()
			console.log(jsonData)
		} catch (err: unknown) {
			console.log(err)
		}
	}

	await refetchDocuments()
}
</script>

<style>
.plugin-root {
	padding: 30px;
}
</style>

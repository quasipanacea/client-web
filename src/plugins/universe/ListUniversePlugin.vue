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
					<th>ID</th>
					<th>Name</th>
					<th>Filepath</th>
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
import * as schema from '../../schema'
import * as util from '../../util/util'

const el = ref()

let userDocumentName = ref('')

let documentsTitle = ref({})
let documents = ref({})

let globals = reactive({ documentsDir: '' })

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
	const [success, data] = await util.extractResponse<
		schema.documentCreateResType,
		schema.documentCreateReqType
	>('/api/document/create', { name: 'thing' })

	await refetchDocuments()
}
</script>

<style>
.plugin-root {
	padding: 30px;
}
</style>

<template>
	<div class="plugin-root">
		<!-- <FormKit
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
		</FormKit> -->
		<span>position: </span>
		<span id="lavaPosition">navigation</span>
		<h2>List</h2>
		<NavigatableList />
		<h2>Choice</h2>
		<NavigatableChoice />
		<h2>Table</h2>
		<NavigatableTable />
		<h2>Lava Composable</h2>
		<button @click="showActionPopup">Show Action Popup</button>
		<!-- <table class="table">
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
		</table> -->
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, defineEmits } from 'vue'
import * as schema from '../../../schema'
import * as util from '../../../util/util'
import NavigatableList from '../../../components/NavigatableList.vue'
import NavigatableTable from '../../../components/NavigatableTable.vue'
import NavigatableChoice from '../../../components/NavigatableChoice.vue'
import LavaVerticalList from '../../../subprojects/lavakey/LavaVerticalList.vue'
import { popupPrompt } from '../../../subprojects/actionpopup/popupPrompt'
import { lavaKey } from '../../../subprojects/lavakey/LavakeyManager'

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

async function showActionPopup() {
	popupPrompt.show(['a', 'b', 'c'], (choice) => {
		console.log('got something', choice)
	})
}
</script>

<style>
.plugin-root {
	padding: 30px;
}
</style>

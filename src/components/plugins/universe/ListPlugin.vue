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
		<br /><br />

		<h2>Vertical List</h2>
		<DisplayVerticalList :items="dataVerticalList" />
		<h2>HorizontalList</h2>
		<DisplayHorizontalList :items="dataHorizontalList" />

		<h2>Popup Thing</h2>
		<div style="margin: 5px" data-lava="group">
			<button @click="showActionPopup" data-lava="item">
				Show Action Popup
			</button>
		</div>
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
import { ref, reactive, onMounted } from 'vue'
import type * as schema from '../../../schema'
import * as util from '../../../util/util'
import NavigatableList from '../../../components/NavigatableList.vue'
import NavigatableTable from '../../../components/NavigatableTable.vue'
import NavigatableChoice from '../../../components/NavigatableChoice.vue'
import LavaVerticalList from '../../../subprojects/lavakey/LavaVerticalList.vue'
import { popupPrompt } from '../../../subprojects/actionpopup/popupPrompt'
import { lavaKey } from '../../../subprojects/lavakey/LavakeyManager'
import DisplayVerticalList from '../../DisplayVerticalList.vue'
import DisplayHorizontalList from '../../DisplayHorizontalList.vue'

const el = ref()

let userDocumentName = ref('')

let documentsTitle = ref({})
let documents = ref({})

let globals = reactive({ documentsDir: '' })

const dataVerticalList = [
	{
		value: 'Alpha',
	},
	{
		value: 'Bravo',
	},
	{
		value: 'Charlie',
	},
	{
		value: 'Delta',
	},
	{
		value: 'Echo',
	},
]

const dataHorizontalList = [
	{
		value: 'Three',
	},
	{
		value: 'Four',
	},
	{
		value: 'Five',
	},
	{
		value: 'Six',
	},
]

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

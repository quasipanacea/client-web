<template>
	<div>
		<h1>Documents</h1>
		<h2>New Document</h2>
		<FormKit type="text" v-model="newDocumentName" />
		<FormKit type="submit" @click="newDocument()" />
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
				</tr>
			</thead>
			<tbody data-lava="group" data-lava-orientation="vertical">
				<tr v-for="document of documents" :key="document.name" data-lava="item">
					<td>
						<router-link :to="`/document/${document.name}`">{{
							document.name
						}}</router-link>
					</td>
					<td>
						<FormKit type="submit" @click="deleteDocument(document.name)"
							>Delete</FormKit
						>
					</td>
				</tr>
			</tbody>
		</table>

		<h2>Vertical List</h2>
		<DisplayVerticalList :items="dataVerticalList" />
		<h2>HorizontalList</h2>
		<DisplayHorizontalList :items="dataHorizontalList" />

		<h2>Popup Thing</h2>
		<div style="margin: 5px" data-lava="group">
			<button
				@click="showActionPopup()"
				@keypress="showActionPopup()"
				data-lava="item"
			>
				Show Action Popup
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, defineComponent } from 'vue'
import type * as schema from '@/schema'
import * as util from '@/util/util'
import * as documentUtils from '@/util/documentUtils'

import { popupPrompt } from '@/subprojects/actionpopup/popupPrompt'
import { lavakey } from '@/subprojects/lavakey'
import DisplayVerticalList from '@/components/DisplayVerticalList.vue'
import DisplayHorizontalList from '@/components/DisplayHorizontalList.vue'

export default defineComponent({
	components: {
		DisplayVerticalList,
		DisplayHorizontalList,
	},
	setup() {
		const documents = ref<schema.documentListResType['documents']>([])
		const globals = reactive({ documentsDir: '' })

		const newDocumentName = ref('')
		async function newDocument() {
			await documentUtils.createNewDocument(newDocumentName.value)
			await refetchDocuments()
		}

		async function deleteDocument(documentId: string) {
			await documentUtils.deleteDocument(documentId)
			await refetchDocuments()
		}

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
			const [success, data] = await util.extractResponse<
				schema.documentListResType,
				schema.documentListReqType
			>('/api/document/list', {})
			if (!success) return

			documents.value = data.documents
		}

		async function showActionPopup() {
			popupPrompt.show(['a', 'b', 'c'], (choice) => {
				console.log('got something', choice)
			})
		}

		return {
			newDocumentName,
			newDocument,
			deleteDocument,

			documents,
			dataVerticalList,
			dataHorizontalList,
			refetchDocuments,
			showActionPopup,
		}
	},
})
</script>

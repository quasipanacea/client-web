<template>
	<div>
		<h2>Regular Documents</h2>
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
		<div class="new-document">
			<FormKit type="text" v-model="newDocumentName" />
			<FormKit type="submit" @click="newDocument()" />
		</div>
	</div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, defineComponent } from 'vue'
import type * as schema from '@/../common/schema'
import * as util from '@/util/util'
import * as documentUtils from '@/util/documentUtils'

import { popupPrompt } from '@/subprojects/actionpopup/popupPrompt'
import { lavakey } from '@/subprojects/lavakey'

export default defineComponent({
	setup() {
		// new document
		const newDocumentName = ref('')
		async function newDocument() {
			await documentUtils.createNewDocument(newDocumentName.value)
			await refetchDocuments()
		}

		// delete document
		async function deleteDocument(documentId: string) {
			await documentUtils.deleteDocument(documentId)
			await refetchDocuments()
		}

		// document list
		const documents = ref<schema.documentListResType['documents']>([])
		onMounted(async () => {
			await refetchDocuments()
		})
		async function refetchDocuments() {
			const data = await documentUtils.listDocuments()
			if (!data) return

			documents.value = data.documents
		}

		return {
			newDocumentName,
			newDocument,
			deleteDocument,

			documents,

			refetchDocuments,
		}
	},
})
</script>

<style scoped>
.new-document {
	display: flex;
	gap: 5px;
}
</style>

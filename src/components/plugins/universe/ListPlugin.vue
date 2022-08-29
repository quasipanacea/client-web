api.
<template>
	<div>
		<h2>Single Documents</h2>
		<div class="new-document">
			<FormKit type="text" v-model="newSingleDocumentName" />
			<FormKit type="submit" @click="newSingleDocument()" />
		</div>
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
				</tr>
			</thead>
			<tbody data-lava="group" data-lava-orientation="vertical">
				<tr
					v-for="document of documentsSingle"
					:key="document.name"
					data-lava="item"
				>
					<td>
						<router-link :to="`/document/${document.name}`">{{
							document.name
						}}</router-link>
					</td>
					<td>
						<FormKit type="submit" @click="deleteSingleDocument(document.name)"
							>Delete</FormKit
						>
					</td>
				</tr>
			</tbody>
		</table>
		<h2>Coupled Documents (YouTube)</h2>
		<div class="new-document">
			<FormKit type="text" v-model="newCoupledDocumentName" />
			<FormKit type="submit" @click="newCoupledDocument()" />
		</div>
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
				</tr>
			</thead>
			<tbody data-lava="group" data-lava-orientation="vertical">
				<tr
					v-for="document of documentsCoupled"
					:key="document.name"
					data-lava="item"
				>
					<td>
						<router-link :to="`/document/${document.name}`">{{
							document.name
						}}</router-link>
					</td>
					<td>
						<FormKit type="submit" @click="deleteDocumentCouple(document.name)"
							>Delete</FormKit
						>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import * as schema from '@/../common/schema'
import * as api from '@/util/clientApi'

import { popupPrompt } from '@/subprojects/actionpopup/popupPrompt'
import { lavakey } from '@/subprojects/lavakey'

export default defineComponent({
	setup() {
		const documentsSingle = ref<schema.documentListResType['documents']>([])
		const documentsCoupled = ref<schema.documentListResType['documents']>([])

		const newSingleDocumentName = ref('')
		const newCoupledDocumentName = ref('')

		async function newSingleDocument() {
			await api.documentCreateSingle(newSingleDocumentName.value)
			await refetchDocuments()
		}
		async function newCoupledDocument() {
			await api.documentCreateCouple('youtube', newCoupledDocumentName.value)
			await refetchDocuments()
		}

		// delete document
		async function deleteSingleDocument(name: string) {
			await api.deleteDocumentSingle(name)
			await refetchDocuments()
		}
		async function deleteCoupledDocument(name: string) {
			await api.deleteDocumentCouple('youtube', name)
			await refetchDocuments()
		}

		async function refetchDocuments() {
			const datas = await Promise.all([
				api.documentListSingle(),
				api.documentListCouple('youtube'),
			])
			if (datas[0]) {
				documentsSingle.value = datas[0].documents
			}
			if (datas[1]) {
				documentsCoupled.value = datas[1].documents
			}
		}

		onMounted(async () => {
			await refetchDocuments()
		})

		return {
			documentsSingle,
			documentsCoupled,

			newSingleDocumentName,
			newCoupledDocumentName,
			newSingleDocument,
			newCoupledDocument,

			deleteSingleDocument,
			deleteCoupledDocument,
			refetchDocuments,
			schema,
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

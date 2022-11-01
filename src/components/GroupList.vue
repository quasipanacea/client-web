<template>
	<div class="title">
		<h3>Group: {{ namee }}</h3>
		<FormKit type="submit" label="Delete" @click="deleteGroup()"></FormKit>
	</div>
	<div class="new-item">
		<FormKit type="text" v-model="newDocumentName" />
		<FormKit type="submit" label="New Item" @click="newDocument()"></FormKit>
	</div>
	<template v-if="documents.length === 0">
		<i>No documents</i>
	</template>
	<template v-else>
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="document of documents" :key="document.name">
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
	</template>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as schema from '@/../common/schema'
import * as api from '@/util/clientApi'

export default defineComponent({
	props: {
		name: String,
		refreshFn: Function,
	},
	setup(props) {
		const newDocumentName = ref('')
		const documents = ref<schema.documentListCoupleResponseType['documents']>(
			[],
		)

		onMounted(async () => {
			if (!props.name) return

			await refreshCurrentGroup()
		})

		function deleteGroup() {
			if (!props.name) return

			if (confirm(`Confirm deletion of GROUP: ${props.name}`)) {
				api.groupDelete(props.name)

				props.refreshFn?.()
			}
		}

		async function newDocument() {
			if (!props.name) return

			await api.documentCreateCouple(props.name, newDocumentName.value)
			await refreshCurrentGroup()
		}

		async function deleteDocument(name: string) {
			if (!props.name) return

			if (confirm(`Confirm deletion of DOCUMENT: ${name}`)) {
				api.deleteDocumentCouple(props.name, name)
				await refreshCurrentGroup()
			}
		}

		async function refreshCurrentGroup() {
			if (!props.name) return

			const result = await api.documentListCouple(props.name)
			documents.value = result.documents
		}

		return {
			namee: props.name,
			documents,
			newDocumentName,
			newDocument,

			deleteGroup,
			deleteDocument,
		}
	},
})
</script>

<style scoped>
.title {
	display: flex;
	gap: 5px;
}

.new-item {
	display: flex;
	gap: 3px;
}
</style>

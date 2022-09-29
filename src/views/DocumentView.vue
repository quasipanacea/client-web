<template>
	<div class="container">
		<header class="header">
			<h1 class="title">Document</h1>
			<router-link to="/universe">Back</router-link>
		</header>
		<codemirror
			v-model="documentText"
			:extensions="mirrorExtensions"
			@ready="mirrorReady"
			@keypress="saveDocument()"
		/>
	</div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { debounce } from 'lodash'
import * as api from '@/util/clientApi'
import { EditorState } from '@codemirror/state'
import { markdown as mirrorMarkdown } from '@codemirror/lang-markdown'
import { Codemirror } from 'vue-codemirror'

export default defineComponent({
	setup() {
		const route = useRoute()

		const documentText = ref('')

		const saveDocument = debounce(async () => {
			const documentId = route.fullPath.split('/').at(-1)
			if (!documentId) throw new Error('documentId is undefined')

			await api.writeDocumentSingle(documentId, documentText.value)
		}, 300)

		onMounted(async () => {
			const documentId = route.fullPath.split('/').at(-1)
			if (!documentId) throw new Error('documentId is undefined')

			const json = await api.readDocumentSingle(documentId)
			documentText.value = json.content
		})

		// CodeMirror
		const mirrorExtensions = [mirrorMarkdown()]
		const view = shallowRef()
		const mirrorReady = (payload) => {
			view.value = payload.view
		}
		return { documentText, saveDocument, mirrorExtensions, mirrorReady }
	},
	components: {
		Codemirror,
	},
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

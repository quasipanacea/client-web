<template>
	<div>
		<DocumentList></DocumentList>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentList from '@/components/DocumentList.vue'

export default defineComponent({
	components: {
		DocumentList,
	},
})
</script>

<style scoped>
.new-document {
	display: flex;
	gap: 5px;
}
</style>

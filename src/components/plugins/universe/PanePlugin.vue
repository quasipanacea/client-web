<template>
	<div>
		<DocumentPane />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentPane from '@/components/DocumentPane.vue'

export default defineComponent({
	components: {
		DocumentPane,
	},
})
</script>

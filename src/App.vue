<template>
	<div
		class=":router-view"
		style="position: absolute; width: 100%; height: 100%; overflow: auto"
	>
		<RouterView />
	</div>
	<GlobalPopup />
	<GlobalError />
</template>

<script setup lang="ts">
import GlobalPopup from '@client/components/GlobalPopup.vue'
import GlobalError from '@client/components/GlobalError.vue'
</script>

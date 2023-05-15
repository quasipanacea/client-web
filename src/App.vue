<template>
	<div
		class=":router-view"
		style="position: absolute; width: 100%; height: 100%; overflow: auto"
	>
		<RouterView />
	</div>
	<RootPopup />
	<ShowError />
</template>

<script setup lang="ts">
import RootPopup from '@client/components/RootPopup.vue'
import ShowError from '@client/components/ShowError.vue'
</script>

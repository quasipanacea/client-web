<template>
	<div class="root-view">
		<RouterView />
	</div>
	<ShowError />
</template>

<script setup lang="ts">
import ShowError from '@client/components/ShowError.vue'
</script>

<style scoped>
.root-view {
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: auto;
}
</style>

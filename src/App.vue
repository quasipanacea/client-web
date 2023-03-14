<template>
	<div class="root-view">
		<RouterView />
	</div>
	<ShowError />
</template>

<script setup lang="ts">
import ShowError from '@/components/ShowError.vue'
</script>

<style>
@import '@/assets/base.css';

html,
body {
	height: 100%;
	overflow: hidden;
}

#app {
	height: 100%;
}

.root-view {
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: auto;
}
</style>

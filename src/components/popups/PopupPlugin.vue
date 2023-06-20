<template>
	<h1 class="title is-3 mb-4">Plugin</h1>
	<router-link to="/plugins">
		<button class="button is-primary" @click="hidePopup">See plugins</button>
	</router-link>
</template>

<script setup lang="ts">
import { popup } from '@quasipanacea/common/client/index.js'

async function hidePopup() {
	await popup.hideNoData('null')
}
</script>

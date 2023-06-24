<template>
	<div
		style="
			width: 100%;
			height: 100%;
			position: fixed;
			display: grid;
			grid-template-rows: auto 1fr;
			grid-template-columns: 1fr;
		"
	>
		<GlobalNavigation />
		<div style="position: relative; width: 100vw">
			<RouterView />
		</div>
	</div>

	<GlobalPopup />
	<GlobalError />
</template>

<script setup lang="ts">
import GlobalNavigation from '@client/components/GlobalNavigation.vue'
import GlobalPopup from '@client/components/GlobalPopup.vue'
import GlobalError from '@client/components/GlobalError.vue'
</script>

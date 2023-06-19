<template>
	<nav class="root-nav">
		<span @click="showSettingsPopup">
			<FeatherSettings />
		</span>
		<span @click="showHelpPopup">
			<FeatherHelp />
		</span>
	</nav>
</template>

<script setup lang="ts">
import FeatherHelp from '@client/components/icons/IconFeatherHelp.vue'
import FeatherSettings from '@client/components/icons/IconFeatherSettings.vue'

import HelpPopup from '@client/components/popups/PopupHelp.vue'
import SettingsPopup from '@client/components/popups/PopupSettings.vue'

import { showPopupNoData } from '@quasipanacea/common/client/index.js'

async function showSettingsPopup() {
	await showPopupNoData('null', SettingsPopup)
}

async function showHelpPopup() {
	await showPopupNoData('null', HelpPopup)
}
</script>

<style scoped>
.root-nav {
	display: flex;
	justify-content: space-between;
	background-color: var(--oc-gray-1);
	box-shadow: 2px 2px 3px var(--oc-gray-2);
}

.root-nav > span {
	margin: 2px;
	cursor: pointer;
}

.root-nav > span > svg {
	display: block;
}
</style>

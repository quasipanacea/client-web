<template>
	<nav class="root-nav">
		<span
			class="title is-6"
			style="
				user-select: none;
				font-family: 'IBM Plex Sans', sans-serif;
				font-weight: bold;
			"
		>
			<router-link style="color: inherit" to="/">Quasipanacea</router-link>
		</span>
		<span @click="showSettingsPopup">
			<FeatherSettings width="22px" height="22px" />
		</span>
		<span @click="gotoPlugins">
			<FeatherPackage width="22px" height="22px" />
		</span>
		<span @click="showInfoPopup">
			<FeatherInfo width="22px" height="22px" />
		</span>
	</nav>
</template>

<script setup lang="ts">
import FeatherSettings from '@client/components/icons/FeatherIconTool.vue'
import FeatherPackage from '@client/components/icons/FeatherIconPackage.vue'
import FeatherInfo from '@client/components/icons/FeatherIconInfo.vue'

import SettingsPopup from '@client/components/popups/PopupSettings.vue'
import InfoPopup from '@client/components/popups/PopupInfo.vue'

import { popup } from '@quasipanacea/common/client/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()

async function showSettingsPopup() {
	await popup.showNoData('null', SettingsPopup)
}

async function gotoPlugins() {
	router.push('/plugins')
}

async function showInfoPopup() {
	await popup.showNoData('null', InfoPopup)
}
</script>

<style scoped>
.root-nav {
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: var(--oc-gray-1);
	box-shadow: 2px 2px 3px var(--oc-gray-2);
}

.root-nav > span:not(:first-child) {
	padding: 1px;
	margin: 1px;
	border-radius: 3px;
	cursor: pointer;
}

.root-nav > span:first-child {
	flex: 1 0 auto;
	padding: 0;
	margin: 0;
	margin-inline-start: 4px;
}

.root-nav > span > svg {
	display: block;
}

.root-nav > span:hover > svg {
	filter: drop-shadow(3px 3px 2px var(--oc-gray-4));
}

.root-nav > span:active > svg {
	filter: drop-shadow(3px 3px 2px var(--oc-gray-5));
	transform: scale(1.1);
}
</style>

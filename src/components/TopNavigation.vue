<template>
	<nav class="root-nav">
		<span @click="showSettingsPopup">
			<FeatherSettings />
		</span>
		<span @click="showHelpPopup">
			<FeatherHelp />
		</span>
	</nav>
	<PopupComponent
		:show="boolSettingsPopup"
		@cancel="() => (boolSettingsPopup = false)"
	>
		<h2 class="title is-4">Settings</h2>

		<div class="control">
			<label class="label" for="current-plugin">Set Overview Component</label>
			<div class="select">
				<select id="current-plugin" v-model="defaultStore.currentPlugin">
					<option
						v-for="plugin in defaultStore.plugins"
						:key="plugin"
						:value="plugin"
					>
						{{ plugin }}
					</option>
				</select>
			</div>
		</div>
	</PopupComponent>
	<PopupComponent :show="boolHelpPopup" @cancel="() => (boolHelpPopup = false)">
		<form class="pure-form pure-form-stacked">
			<fieldset>
				<legend><h1>Help</h1></legend>
				<p>
					To learn more about Quasipanacea, please see the GitHub
					<a href="https://github.com/quasipanacea" target="__blank"
						>organization</a
					>.
				</p>
			</fieldset>
		</form>
	</PopupComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import FeatherHelp from '@client/components/icons/IconFeatherHelp.vue'
import FeatherSettings from '@client/components/icons/IconFeatherSettings.vue'
import PopupComponent from '@quasipanacea/plugin-components/PopupComponent.vue'

import { useDefaultStore } from '@client/stores/default.js'

const defaultStore = useDefaultStore()

// popup: settings
const boolSettingsPopup = ref(false)
function showSettingsPopup() {
	boolSettingsPopup.value = true
}

// popup: help
const boolHelpPopup = ref(false)
function showHelpPopup() {
	boolHelpPopup.value = true
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

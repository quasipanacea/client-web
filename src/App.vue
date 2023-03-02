<template>
	<nav class="root-nav">
		<span @click="showSettingsPopup">
			<FeatherSettings />
		</span>
		<span @click="showHelpPopup">
			<FeatherHelp />
		</span>
	</nav>
	<div class="root-view">
		<RouterView />
	</div>

	<PopupComponent
		:show="boolSettingsPopup"
		@cancel="() => (boolSettingsPopup = false)"
	>
		<form class="pure-form pure-form-stacked">
			<fieldset>
				<legend><h1>Settings</h1></legend>

				<label for="current-plugin">Set Overview Component</label>
				<select id="current-plugin" v-model="pluginStore.currentPlugin">
					<option
						v-for="plugin in pluginStore.plugins"
						:key="plugin"
						:value="plugin"
					>
						{{ plugin }}
					</option>
				</select>
			</fieldset>
		</form>
	</PopupComponent>
	<PopupComponent :show="boolHelpPopup" @cancel="() => (boolHelpPopup = false)">
		<form class="pure-form pure-form-stacked">
			<fieldset>
				<legend><h1>Help</h1></legend>
				<p>
					To learn more about Quazipanacea, please see the GitHub
					<a href="https://github.com/quazipanacea" target="__blank"
						>organization</a
					>.
				</p>
			</fieldset>
		</form>
	</PopupComponent>
</template>

<script setup lang="ts">
import { usePluginsStore } from '@/stores/plugins'
import FeatherHelp from '@/components/icons/IconFeatherHelp.vue'
import FeatherSettings from '@/components/icons/IconFeatherSettings.vue'
import PopupComponent from '@/components/PopupComponent.vue'
import { ref } from 'vue'

const pluginStore = usePluginsStore()

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

.root-view {
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: auto;
}
</style>

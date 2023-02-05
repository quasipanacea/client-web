<template>
	<nav class="root-nav">
		<span @click="showSettings = true">
			<FeatherSettings />
		</span>
		<span @click="showHelp = true">
			<FeatherHelp />
		</span>
	</nav>
	<div class="root-view">
		<RouterView />
	</div>
	<dialog :open="showSettings" class="root-dialog-settings">
		<form class="pure-form pure-form-stacked">
			<fieldset>
				<legend>Settings</legend>

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

				<button
					@click="showSettings = false"
					class="pure-button pure-button-primary"
				>
					Close
				</button>
			</fieldset>
		</form>
	</dialog>
	<dialog :open="showHelp" class="root-dialog-help">
		<form class="pure-form pure-form-stacked">
			<fieldset>
				<legend>Help</legend>

				<p>
					To learn more about Quazipanacea, please see the GitHub
					<a href="https://github.com/quazipanacea">organization</a>.
				</p>
				<button
					@click="showHelp = false"
					class="pure-button pure-button-primary"
				>
					Close
				</button>
			</fieldset>
		</form>
	</dialog>
	<ControllerPSingle />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { usePluginsStore } from '@/stores/plugins'
import FeatherHelp from '@/components/icons/IconFeatherHelp.vue'
import FeatherSettings from '@/components/icons/IconFeatherSettings.vue'
import ActionPopup from '@/subprojects/actionpopup/ActionPopup.vue'
import ControllerPMultiple from './components/controllers/ControllerPMultiple.vue'
import ControllerPSingle from './components/controllers/ControllerPSingle.vue'

export default defineComponent({
	setup() {
		const showSettings = ref(false)
		const showHelp = ref(false)
		const pluginStore = usePluginsStore()

		return {
			showSettings,
			showHelp,
			pluginStore,
		}
	},
	components: {
		FeatherHelp,
		FeatherSettings,
		ControllerPSingle,
	},
})
</script>

<style>
@import './assets/base.css';

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

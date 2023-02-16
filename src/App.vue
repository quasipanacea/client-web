<template>
	<nav class="root-nav">
		<span @click="showPopupSettings">
			<FeatherSettings />
		</span>
		<span @click="showPopupInfo">
			<FeatherHelp />
		</span>
	</nav>
	<div class="root-view">
		<RouterView />
	</div>

	<PopupComponent event-name="show-popup-settings">
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
	<PopupComponent event-name="show-popup-info">
		<form class="pure-form pure-form-stacked">
			<fieldset>
				<legend><h1>Help</h1></legend>
				<p>
					To learn more about Quazipanacea, please see the GitHub
					<a href="https://github.com/quazipanacea">organization</a>.
				</p>
			</fieldset>
		</form>
	</PopupComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { emitter } from '@/util/emitter'
import { usePluginsStore } from '@/stores/plugins'
import FeatherHelp from '@/components/icons/IconFeatherHelp.vue'
import FeatherSettings from '@/components/icons/IconFeatherSettings.vue'
import PopupComponent from '@/components/PopupComponent.vue'

export default defineComponent({
	setup() {
		const pluginStore = usePluginsStore()

		return {
			pluginStore,
			showPopupSettings() {
				emitter.emit('show-popup-settings')
			},
			showPopupInfo() {
				emitter.emit('show-popup-info')
			},
		}
	},
	components: {
		FeatherHelp,
		FeatherSettings,
		PopupComponent,
	},
})
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

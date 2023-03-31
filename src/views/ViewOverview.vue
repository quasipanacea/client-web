<template>
	<nav class="root-nav">
		<span @click="showSettingsPopup">
			<FeatherSettings />
		</span>
		<span @click="showHelpPopup">
			<FeatherHelp />
		</span>
	</nav>
	<div
		style="
			position: absolute;
			top: 30px;
			left: 0;
			width: 100%;
			height: calc(100% - 30px);
		"
	>
		<component v-if="currentModule" :is="currentModule" />
	</div>

	<PopupComponent
		:show="boolSettingsPopup"
		@cancel="() => (boolSettingsPopup = false)"
	>
		<form class="pure-form pure-form-stacked">
			<fieldset>
				<legend><h1>Settings</h1></legend>

				<label for="current-plugin">Set Overview Component</label>
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
import { onMounted, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import FeatherHelp from '@client/components/icons/IconFeatherHelp.vue'
import FeatherSettings from '@client/components/icons/IconFeatherSettings.vue'
import PopupComponent from '@client/components/PopupComponent.vue'

import { useDefaultStore } from '@client/stores/default.js'
import * as util from '@client/util/util.js'

const props = defineProps<{
	pluginId: string
}>()

const router = useRouter()
const defaultStore = useDefaultStore()
const currentModule = shallowRef<unknown>()

async function updateModule(name: string) {
	currentModule.value = await util.importOverview(name)
}

onMounted(async () => {
	if (!props.pluginId) return
	await updateModule(props.pluginId)
	defaultStore.currentPlugin = props.pluginId
})
defaultStore.$subscribe(async (_, state) => {
	router.push({
		path: `/overview/${state.currentPlugin}`,
	})
	await updateModule(state.currentPlugin)
})

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
.plugin-root {
	padding: 10px;
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
</style>

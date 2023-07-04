<template>
	<h2 class="title is-3 mb-4">Settings</h2>
	<div class="tabs">
		<ul>
			<li
				v-for="tab in tabs"
				:key="tab.id"
				:class="{ 'is-active': activeTab === tab.id }"
				@click="() => setActiveTab(tab.id)"
			>
				<a>{{ tab.title }}</a>
			</li>
		</ul>
	</div>
	<div v-if="activeTab === 'overview'">
		<div class="field">
			<label class="label" for="current-plugin">Overview Plugin</label>
			<div class="control">
				<div class="select">
					<select id="current-plugin" v-model="defaultOverview">
						<option v-for="id in possibleOverviews" :key="id" :value="id">
							{{ id }}
						</option>
					</select>
				</div>
			</div>
		</div>
	</div>
	<div v-else-if="activeTab === 'pod'">
		<h3 class="title is-5">Formats Settings</h3>
		<div
			class="field"
			v-for="(compatiblePluginsIds, mimeType) in mimetypeMap"
			:key="mimeType"
		>
			<label class="label" :for="mimeType">{{ mimeType }}</label>
			<div class="control">
				<div class="select">
					<select
						@change="saveSettings"
						:name="mimeType"
						:id="mimeType"
						v-model="mimetypePreferences[mimeType]"
					>
						<option
							v-for="option in compatiblePluginsIds"
							:key="option"
							:value="option"
						>
							{{ option }}
						</option>
					</select>
				</div>
			</div>
		</div>
	</div>
	<div v-else-if="activeTab === 'model'">
		<h3 class="title is-5">No settings</h3>
	</div>
	<div v-else-if="activeTab === 'view'">
		<h3 class="title is-5">No settings</h3>
	</div>
	<div v-else>
		<h3 class="title is-5">Setting not found</h3>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

import {
	trpcClient,
	type BareAppRouter,
	pluginClient,
} from '@quasipanacea/common/client/index.js'

const api = trpcClient.yieldClient<BareAppRouter>()

const tabs = ref([
	{
		title: 'Overview',
		id: 'overview',
	},
	{
		title: 'Pod',
		id: 'pod',
	},
	{
		title: 'Model',
		id: 'model',
	},
	{
		title: 'View',
		id: 'view',
	},
])
const activeTab = ref('pod')
function setActiveTab(tabName: string) {
	activeTab.value = tabName
}

onMounted(async () => {
	await updateDataSettings()
	await updateDataOverview()
	await saveSettings()
})
onUnmounted(async () => {
	await saveSettings()
})

const mimetypeMap = ref<Record<string, string[]>>({})
const mimetypePreferences = ref<Record<string, string>>({})
async function updateDataSettings() {
	const storedValue = (await api.core.settingsGet.query()).mimesToPlugin || {}
	if (storedValue) {
		mimetypePreferences.value = storedValue
	}

	mimetypeMap.value = (await api.core.indexGet.query()).formats
	for (const [mimeType, pluginIds] of Object.entries(mimetypeMap.value)) {
		mimetypePreferences.value[mimeType] ||= pluginIds[0]
	}
}
async function saveSettings() {
	await api.core.settingsModify.mutate({
		mimesToPlugin: mimetypePreferences.value,
	})
}

const defaultOverview = ref('')
const possibleOverviews = ref<string[]>([])
async function updateDataOverview() {
	possibleOverviews.value = (await pluginClient.list('overview')).map(
		(item) => item.metadata.id,
	)

	const settingsJson = await api.core.settingsGet.query()
	if (settingsJson.defaultOverview) {
		defaultOverview.value = settingsJson.defaultOverview
	}

	if (!defaultOverview.value) {
		defaultOverview.value = possibleOverviews.value[0]
	}
}
watch(defaultOverview, async () => {
	await saveOverview()
})
async function saveOverview() {
	await api.core.settingsModify.mutate({
		defaultOverview: defaultOverview.value,
	})
}
</script>

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
		<h3 class="title is-5">Defaults</h3>
		<div class="field">
			<label class="label" for="current-plugin">Overview</label>
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
	<div v-else-if="activeTab === 'model'">
		<h3 class="title is-5">Defaults</h3>
		<div
			class="field"
			v-for="(compatiblePluginsIds, mimeType) in modelMimeOptions"
			:key="mimeType"
		>
			<label class="label" :for="mimeType">{{ mimeType }}</label>
			<div class="control">
				<div class="select">
					<select
						@change="saveSettings"
						:name="mimeType"
						:id="mimeType"
						v-model="modelMimes[mimeType]"
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
	<div v-else-if="activeTab === 'modelview'">
		<h3 class="title is-5">Defaults</h3>
		<div
			class="field"
			v-for="(compatiblePluginsIds, mimeType) in modelviewMimeOptions"
			:key="mimeType"
		>
			<label class="label" :for="mimeType">{{ mimeType }}</label>
			<div class="control">
				<div class="select">
					<select
						@change="saveSettings"
						:name="mimeType"
						:id="mimeType"
						v-model="modelviewMimes[mimeType]"
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
	<div v-else-if="activeTab === 'pod'">
		<h3 class="title is-5">Defaults</h3>
		<div
			class="field"
			v-for="(compatiblePluginsIds, mimeType) in podMimeOptions"
			:key="mimeType"
		>
			<label class="label" :for="mimeType">{{ mimeType }}</label>
			<div class="control">
				<div class="select">
					<select
						@change="saveSettings"
						:name="mimeType"
						:id="mimeType"
						v-model="podMimes[mimeType]"
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
	<div v-else-if="activeTab === 'podview'">
		<h3 class="title is-5">Defaults</h3>
		<div
			class="field"
			v-for="(compatiblePluginsIds, mimeType) in podviewMimeOptions"
			:key="mimeType"
		>
			<label class="label" :for="mimeType">{{ mimeType }}</label>
			<div class="control">
				<div class="select">
					<select
						@change="saveSettings"
						:name="mimeType"
						:id="mimeType"
						v-model="podviewMimes[mimeType]"
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
	<div v-else>
		<h3 class="title is-5">{{ activeTab }}</h3>
		<p>No settings found</p>
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
		title: 'Model',
		id: 'model',
	},
	{
		title: 'Modelview',
		id: 'modelview',
	},
	{
		title: 'Pod',
		id: 'pod',
	},
	{
		title: 'Podview',
		id: 'podview',
	},
])
const activeTab = ref('podview')
function setActiveTab(tabName: string) {
	activeTab.value = tabName
}

onMounted(async () => {
	await Promise.all([
		updateDataOverview(),
		updateDataModel(),
		updateDataModelview(),
		updateDataPod(),
		updateDataPodview(),
		saveSettings(),
	])
})
onUnmounted(async () => {
	await saveSettings()
})

const podMimes = ref<Record<string, string>>({})
const podMimeOptions = ref<Record<string, string[]>>({})
async function updateDataPod() {
	const settingsJson = await api.core.settingsGet.query()
	podMimes.value = settingsJson.podMimes || {}

	const indexJson = await api.core.indexGet.query()
	podMimeOptions.value = indexJson.podMimeOptions || {}
	for (const [mimeType, podIds] of Object.entries(podMimeOptions.value)) {
		podMimes.value[mimeType] ||= podIds[0]
	}
}

const podviewMimes = ref<Record<string, string>>({})
const podviewMimeOptions = ref<Record<string, string[]>>({})
async function updateDataPodview() {
	const settingsJson = await api.core.settingsGet.query()
	podviewMimes.value = settingsJson.podviewMimes || {}

	const indexJson = await api.core.indexGet.query()
	podviewMimeOptions.value = indexJson.podviewMimeOptions || {}
	for (const [mimeType, podviewIds] of Object.entries(
		podviewMimeOptions.value,
	)) {
		podviewMimes.value[mimeType] ||= podviewIds[0]
	}
}

const modelMimes = ref<Record<string, string>>({})
const modelMimeOptions = ref<Record<string, string[]>>({})
async function updateDataModel() {
	const settingsJson = await api.core.settingsGet.query()
	modelMimes.value = settingsJson.modelMimes || {}

	const indexJson = await api.core.indexGet.query()
	modelMimeOptions.value = indexJson.modelMimeOptions || {}
	for (const [mimeType, modelIds] of Object.entries(modelMimeOptions.value)) {
		modelMimes.value[mimeType] ||= modelIds[0]
	}
}

const modelviewMimes = ref<Record<string, string>>({})
const modelviewMimeOptions = ref<Record<string, string[]>>({})
async function updateDataModelview() {
	const settingsJson = await api.core.settingsGet.query()
	modelviewMimes.value = settingsJson.modelviewMimes || {}

	const indexJson = await api.core.indexGet.query()
	modelviewMimeOptions.value = indexJson.modelviewMimeOptions || {}
	for (const [mimeType, modelviewIds] of Object.entries(
		modelviewMimeOptions.value,
	)) {
		modelviewMimes.value[mimeType] ||= modelviewIds[0]
	}
}

async function saveSettings() {
	await api.core.settingsModify.mutate({
		modelMimes: modelMimes.value,
		modelviewMimes: modelviewMimes.value,
		podMimes: podMimes.value,
		podviewMimes: podviewMimes.value,
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

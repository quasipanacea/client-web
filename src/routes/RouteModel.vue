<template>
	<div
		v-if="currentModule"
		style="
			display: grid;
			grid-template-rows: auto 1fr;
			height: 100%;
			padding: 5px;
		"
	>
		<div
			class="header"
			style="display: flex; justify-content: space-between; align-items: center"
		>
			<h1 class="title mb-0">
				{{ currentModel.name }}
			</h1>
			<span class="is-flex" style="gap: 5px">
				<router-link to="/">
					<button class="button is-link">Overview</button>
				</router-link>
				<div class="dropdown is-right is-hoverable">
					<div class="dropdown-trigger">
						<button
							class="button"
							aria-haspopup="true"
							aria-controls="dropdown-menu"
						>
							<span>Actions</span>
							<span class="icon">
								<ion-icon name="chevron-down-outline"></ion-icon>
							</span>
						</button>
					</div>
					<div class="dropdown-menu" id="dropdown-menu" role="menu">
						<div class="dropdown-content">
							<a href="#" class="dropdown-item" @click="actionRename">Rename</a>
							<a class="dropdown-item" @click="actionDelete(currentModel.uuid)"
								>Delete</a
							>
						</div>
					</div>
				</div>
			</span>
		</div>
		<component v-if="currentModule" :is="currentModule" :uuid="modelUuid" />
	</div>
	<div v-else>
		<p>Loading...</p>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import { t } from '@quasipanacea/common/index.js'
import {
	pluginClient,
	trpcClient,
	type BareAppRouter,
	popup,
} from '@quasipanacea/common/client/index.js'
import { ModelEditPropertiesPopup } from '@quasipanacea/common/components/index.ts'

const props = defineProps<{
	modelUuid: string
}>()
const api = trpcClient.yieldClient<BareAppRouter>()
const router = useRouter()

const currentModel = ref<t.Model_t | null>(null)
const currentModule = shallowRef<unknown>()

async function actionRename() {
	if (!currentModel.value) return

	showRenameModelPopup(currentModel.value.uuid, currentModel.value.name)
}

async function actionDelete(uuid: string) {
	if (globalThis.confirm('Are you sure?')) {
		await api.core.modelRemove.mutate({ uuid })
		router.push('/')
	}
}

async function showRenameModelPopup(uuid: string, oldName: string) {
	await popup.show('model-edit-properties-popup', ModelEditPropertiesPopup, {
		uuid,
		oldName,
	})
	await updateData()
}

onMounted(async () => {
	await updateData()
})
async function updateData() {
	const model = (await api.core.modelList.query()).models.find(
		(item) => item.uuid === props.modelUuid,
	)
	if (!model) {
		throw new Error(`Failed to find pod: ${props.modelUuid}`)
	}

	const settingsJson = await api.core.settingsGet.query()
	const pluginId = settingsJson.defaultModelFormats?.[model.format]?.viewPlugin
	if (!pluginId) {
		throw new Error(
			`Failed to find pluginId for model format '${model.format}'`,
		)
	}

	const plugin = pluginClient.get(pluginId)

	currentModel.value = model
	currentModule.value = plugin.modelView?.component
}
</script>

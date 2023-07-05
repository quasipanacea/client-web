<template>
	<div
		v-if="currentPod"
		style="display: grid; grid-template-rows: auto 1fr; height: 100%"
	>
		<div
			class="header"
			style="
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-inline: 5px;
			"
		>
			<h1 style="font-size: 42px">
				{{ currentPod.name }}
			</h1>
			<span class="is-flex" style="gap: 5px">
				<router-link to="/">
					<button class="button is-link">Overview</button>
				</router-link>
				<div
					class="dropdown is-right"
					:class="{ 'is-active': isDropdownActive }"
					@click="isDropdownActive = !isDropdownActive"
				>
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
							<a class="dropdown-item" @click="actionDelete(currentPod.uuid)"
								>Delete</a
							>
						</div>
					</div>
				</div>
			</span>
		</div>
		<div class=":pod-wrapper">
			<component v-if="currentModule" :is="currentModule" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { t } from '@quasipanacea/common/index.ts'
import {
	popup,
	trpcClient,
	type BareAppRouter,
	pluginClient,
} from '@quasipanacea/common/client/index.ts'
import { PodRenamePopup } from '@quasipanacea/common/components/index.ts'

const props = defineProps<{ podUuid: string }>()
const api = trpcClient.yieldClient<BareAppRouter>()

const currentPod = ref<t.Pod_t | null>(null)
const currentModule = shallowRef<unknown>()

async function actionRename() {
	if (!currentPod.value) return

	showRenamePodPopup(currentPod.value.uuid, currentPod.value.name)
}

async function actionDelete(uuid: string) {
	if (globalThis.confirm('Are you sure?')) {
		await api.core.podRemove.mutate({ uuid })
		router.push('/')
	}
}

// dropdown
const isDropdownActive = ref<boolean>(false)

async function showRenamePodPopup(podUuid: string, oldName: string) {
	await popup.show('pod-rename-popup', PodRenamePopup, {
		podUuid,
		oldName,
	})
	await updateData()
}

onMounted(async () => {
	await updateData()
})
async function updateData() {
	const pod = (await api.core.podList.query()).pods.find(
		(item) => item.uuid === props.podUuid,
	)
	if (!pod) {
		throw new Error(`Failed to find pod: ${props.podUuid}`)
	}

	const settingsJson = await api.core.settingsGet.query()
	const podviewId = settingsJson.podviewMimes?.[pod.format]
	if (!podviewId) {
		throw new Error(
			`Failed to find podviewId with pod uuid ${pod.uuid} and pod format ${pod.format}`,
		)
	}

	const plugin = pluginClient.get('podview', podviewId)

	currentPod.value = pod
	currentModule.value = plugin.component
}
</script>

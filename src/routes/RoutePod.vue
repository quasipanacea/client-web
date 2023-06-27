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
			<span style="display: flex; gap: 5px">
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
	format,
	popup,
	trpcClient,
	type BareAppRouter,
	plugin,
} from '@quasipanacea/common/client/index.ts'
import { PodRenamePopup } from '@quasipanacea/common/components/index.ts'

const props = defineProps<{ podUuid: string }>()
const router = useRouter()
const api = trpcClient.yieldClient<BareAppRouter>()

const currentPod = ref<t.Pod_t | null>(null)
const currentModule = shallowRef<unknown>()

onMounted(async () => {
	await updateData()
})

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

async function updateData() {
	const pod = (await api.core.podList.query()).pods.find(
		(item) => item.uuid === props.podUuid,
	)
	if (!pod) {
		throw new Error(`Failed to find pod: ${props.podUuid}`)
	}

	const pluginModule = await format.getPluginByFormat('pod', pod.format)
	currentPod.value = pod
	currentModule.value = pluginModule.component
}
</script>

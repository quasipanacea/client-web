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
			<h1 style="font-size: 42px; font-weight: bold; font-family: 'Work Sans'">
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
								<i class="fas fa-angle-down"></i>
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
import { shallowRef, onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import type * as t from '@quasipanacea/common/types.ts'
import { PodRenamePopup } from '@quasipanacea/plugin-components/popups/index.ts'

import * as util from '@client/util/util'
import { useApi3, type BareAppRouter } from '@quasipanacea/common/trpcClient.ts'
import { showPopup } from '@quasipanacea/common/client/popup.js'

const props = defineProps<{ podUuid: string }>()
const router = useRouter()
const api = useApi3<BareAppRouter>()

const currentPod = ref<t.Pod_t | null>(null)
const currentModule = shallowRef<unknown>()

onMounted(async () => {
	const pod = (await api.core.podList.query()).pods.find(
		(item) => item.uuid === props.podUuid,
	)
	if (!pod) {
		throw new Error(`Failed to find pod: ${props.podUuid}`)
	}

	currentPod.value = pod
	currentModule.value = await util.importPod(pod.plugin)
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

// popup: rename pod
async function showRenamePodPopup(podUuid: string, oldName: string) {
	await showPopup('pod-rename-popup', PodRenamePopup, { podUuid, oldName })
	window.location.reload()
}
</script>

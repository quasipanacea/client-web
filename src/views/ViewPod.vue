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
		<component v-if="currentModule" :is="currentModule" />
		<PodRenamePopup
			:show="boolRenamePod"
			:podUuid="dataRenamePod.podUuid"
			:oldName="dataRenamePod.oldName"
			@submit="afterRenamePod"
			@cancel="() => (boolRenamePod = false)"
		/>
	</div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, ref, reactive } from 'vue'

import type * as t from '@common/types.ts'
import { api } from '@/util/api'

import PodRenamePopup from '@common/shared/components/popups/PodRenamePopup.vue'

const props = defineProps<{ uuid: string }>()

const currentPod = ref<t.Pod_t | null>(null)
const currentModule = shallowRef(null)

onMounted(async () => {
	const pod = (await api.core.podList.query()).pods.find(
		(item) => item.uuid === props.uuid,
	)
	if (!pod) {
		throw new Error(`Failed to find pod: ${props.uuid}`)
	}
	currentPod.value = pod

	const camelCased = pod.pluginId.replace(/-([a-z])/g, function (g) {
		return g[1].toUpperCase()
	})
	const filename = 'Pod' + camelCased[0].toUpperCase() + camelCased.slice(1)

	const module = (
		await import(`../../common/resource-symlinks/pods/${filename}.vue`)
	).default
	currentModule.value = module
})

async function actionRename() {
	if (!currentPod.value) return
	showRenamePodPopup(currentPod.value.uuid, currentPod.value.name)
}

async function actionDelete(uuid: string) {
	if (globalThis.confirm('Are you sure?')) {
		await api.core.podRemove.mutate({ uuid })
	}
}

// dropdown
const isDropdownActive = ref<boolean>(false)

// popup: rename pod
const boolRenamePod = ref(false)
const dataRenamePod = reactive({ podUuid: '', oldName: '' })
function showRenamePodPopup(podUuid: string, oldName: string) {
	dataRenamePod.podUuid = podUuid
	dataRenamePod.oldName = oldName
	boolRenamePod.value = true
}
async function afterRenamePod(value: unknown) {
	boolRenamePod.value = false
}
</script>

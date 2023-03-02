<template>
	<template v-if="currentPod">
		<div class="header">
			<h1 style="font-size: 42px; font-weight: bold">{{ currentPod.name }}</h1>
			<span style="position: absolute; right: 10px; top: 15px">
				<ul class="pure-menu pure-menu-horizontal">
					<li class="pure-menu-item">
						<RouterLink to="/" class="pure-menu-link">Back</RouterLink>
					</li>
					<li
						class="pure-menu-item pure-menu-has-children pure-menu-allow-hover"
					>
						<a class="pure-menu-link">Actions</a>
						<ul class="pure-menu-children">
							<li class="pure-menu-item">
								<a class="pure-menu-link" @click="actionRename">Rename</a>
							</li>
							<li class="pure-menu-item">
								<a class="pure-menu-link" @click="actionDelete(currentPod.uuid)"
									>Delete</a
								>
							</li>
						</ul>
					</li>
				</ul>
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
	</template>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, ref, reactive } from 'vue'

import type * as t from '@common/types.ts'
import { api } from '@/util/api'

import PodRenamePopup from '@common/components/popups/PodRenamePopup.vue'

const props = defineProps<{ uuid: string }>()

const currentPod = ref<t.Pod_t | null>(null)
const currentModule = shallowRef(null)

onMounted(async () => {
	const pod = (await api.podList.query()).pods.find(
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
	showRenamePodPopup(currentPod?.uuid, currentPod?.name)
}

async function actionDelete(uuid: string) {
	if (globalThis.confirm('Are you sure?')) {
		await api.podRemove.mutate({ uuid })
	}
}

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

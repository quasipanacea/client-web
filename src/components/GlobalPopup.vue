<template>
	<dialog class="dialog" ref="dialogEl" style="border: 2px solid black">
		<div class="m-0" style="display: grid; grid-template-rows: auto 1fr">
			<div class="m-0 p-1" style="border-bottom: 2px solid black">
				<button class="button is-black" @click="hidePopup()">Close</button>
			</div>
			<div class="m-0 p-4" style="overflow: auto">
				<component :is="popupComponent" v-bind="popupProps" />
			</div>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'

import { popup } from '@quasipanacea/common/client/index.js'

const dialogEl = ref<null | HTMLDialogElement>(null)
const popupComponent = shallowRef<unknown | null>(null)
const popupProps = ref({})

popup.popupEmitter.attach((msg) => {
	if (msg.type === 'show') {
		if (
			dialogEl.value?.open &&
			// @ts-expect-error Using undocumented "private" members
			popupComponent.value?.__name === msg.component?.__name
		) {
			hidePopup()
			return
		}

		showPopup()
		popupComponent.value = msg.component
		if (msg.props) {
			popupProps.value = msg.props
		}
	} else if (msg.type === 'hide') {
		hidePopup()
	} else {
		throw new Error(`Unknown popup message type: ${msg}`)
	}
})

function showPopup() {
	if (dialogEl.value && !dialogEl.value.open) {
		dialogEl.value.showModal()
	}
}

function hidePopup() {
	dialogEl.value?.close()
	popupComponent.value = null
	popupProps.value = {}
}
</script>

<style scoped>
.dialog {
	min-width: 500px;
	max-width: calc(100% - 100px);
	max-height: calc(100% - 100px);
	padding: 0;
	margin-top: 100px;
}
</style>

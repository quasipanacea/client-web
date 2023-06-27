<template>
	<dialog
		:open="popupActive"
		class="dialog"
		style="
			position: fixed;
			top: 8vh;
			width: 80vw;
			height: 80vh;
			z-index: 1000;
			padding: 0;
			box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
				0px 10px 15px -3px rgba(0, 0, 0, 0.1),
				0px 10px 15px -3px rgba(0, 0, 0, 0.1);
		"
	>
		<div
			style="
				height: 100%;
				margin: 0;
				display: grid;
				grid-template-rows: auto 1fr;
			"
		>
			<div style="margin: 0; padding: 5px; border-bottom: 3px solid black">
				<button class="button is-black" @click="hidePopup">Close</button>
			</div>
			<div style="padding: 16px; margin: 0; overflow: auto">
				<component :is="popupComponent" v-bind="popupProps" />
			</div>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'

import { popup } from '@quasipanacea/common/client/index.js'

const popupActive = ref(false)
const popupComponent = shallowRef<unknown | null>(null)
const popupProps = ref({})

popup.popupEmitter.attach((msg) => {
	if (msg.type === 'show') {
		if (
			popupActive.value &&
			// @ts-expect-error Using undocumented "private" members
			popupComponent.value?.__name === msg.component?.__name
		) {
			hidePopup()
			return
		}

		popupActive.value = true
		popupComponent.value = msg.component
		if (msg.props) {
			popupProps.value = msg.props
		}
	} else if (msg.type === 'hide') {
		popupActive.value = false
		popupComponent.value = null
		popupProps.value = {}
	} else {
		throw new Error(`Unknown popup message type: ${msg}`)
	}
})

function hidePopup() {
	popup.hideNoData('cancel')
}
</script>

<template>
	<div v-if="component" class="popup">
		<FormKit type="submit" @click="removePopup">Close</FormKit>
		<hr />
		<div class="popup-inner">
			<component :is="component" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { FormKit } from '@formkit/vue'

import { popupEmitter } from '../../util/popupSimple'
import type { Events } from '../../util/popupSimple'

export default defineComponent({
	setup() {
		const component = shallowRef<null | unknown>(null)

		popupEmitter.on('*', (type, event) => {
			if (type.endsWith('open')) {
				const ev = event as Events['generic::open']
				component.value = ev.component
			}
		})

		popupEmitter.on('*', (type) => {
			if (type.endsWith('close')) {
				component.value = null
			}
		})

		function removePopup() {
			popupEmitter.emit('generic::close', { result: null })
		}

		return {
			component,
			removePopup,
		}
	},
})
</script>

<style scoped>
.popup {
	--margin: 60px;

	position: fixed;
	top: var(--margin);
	left: var(--margin);
	width: calc(100% - (var(--margin) * 2));
	height: calc(100% - (var(--margin) * 2));

	border-radius: 5px;
	border: 1px solid black;
	background: white;
}

.popup-inner {
	margin: 5px;
}

.component-wrapper {
	border: 1px solid lightgray;
}
</style>

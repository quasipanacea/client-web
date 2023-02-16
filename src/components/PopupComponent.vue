<template>
	<dialog
		:open="isOpen"
		class="dialog"
		style="
			--space: 250px;
			position: fixed;
			top: var(--space);
			left: var(--space);
			width: calc(100% - (2 * var(--space)));
			height: calc(100% - (2 * var(--space)));
			padding: 10px;
			border-radius: 5px;
			background-color: var(--oc-gray-1);
			box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
				0px 10px 15px -3px rgba(0, 0, 0, 0.1),
				0px 10px 15px -3px rgba(0, 0, 0, 0.1);
		"
	>
		<div
			style="
				position: absolute;
				top: -50px;
				left: 0;
				box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
					0px 10px 15px -3px rgba(0, 0, 0, 0.1);
			"
		>
			<button class="pure-button pure-button-primary" @click="hidePopup">
				Close
			</button>
		</div>
		<slot />
	</dialog>
</template>

<script lang="ts">
import { defineComponent, onDeactivated, onMounted, ref } from 'vue'

import { emitter } from '@/util/emitter'

export default defineComponent({
	props: {
		eventName: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const isOpen = ref(false)

		onMounted(() => {
			emitter.on(props.eventName, (value) => {
				isOpen.value = typeof value === 'boolean' ? value : true
			})
		})
		onDeactivated(() => {
			emitter.off(props.eventName)
		})

		function hidePopup() {
			isOpen.value = false
		}

		return {
			isOpen,
			hidePopup,
		}
	},
})
</script>

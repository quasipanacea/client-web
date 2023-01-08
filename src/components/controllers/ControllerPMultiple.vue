<template>
	<div v-if="components.length > 0" class="popups">
		<template v-for="obj in components" :key="obj.id">
			<div class="component-wrapper">
				<component :is="obj.component" :id="obj.id" />
				<FormKit type="submit" @click="removePopup(obj)">Remove</FormKit>
				<hr />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormKit } from '@formkit/vue'

import {
	onConstructPopup,
	onDeconstructAnyPopup,
	popupDeconstruct,
} from '@/util/popup'

export default defineComponent({
	setup() {
		const components = ref<
			{ id: string; popupId: string; component: unknown }[]
		>([])

		onConstructPopup((id, popupId, component) => {
			components.value.push({
				id,
				popupId,
				component,
			})
		})

		onDeconstructAnyPopup((id) => {
			const idx = components.value.findIndex((item) => item.id == id)
			if (idx !== -1) components.value.splice(idx, 1)
		})

		function removePopup(obj: typeof components.value[0]) {
			const idx = components.value.findIndex((item) => item.id == obj.id)
			components.value.splice(idx, 1)
			// eslint-disable-next-line
			popupDeconstruct(obj.id, obj.popupId as any, null)
		}

		return {
			components,
			removePopup,
		}
	},
	components: {
		FormKit, // SHOULD REMOVE, WITH LINT RULE
	},
})
</script>

<style scoped>
.popups {
	--margin: 60px;

	position: fixed;
	top: var(--margin);
	left: var(--margin);
	width: calc(100% - (var(--margin) * 2));
	height: calc(100% - (var(--margin) * 2));

	background-color: coral;
	opacity: 0.9;
	border-radius: 5px;
}
</style>

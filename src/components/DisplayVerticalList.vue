<template>
	<ul data-lava data-lava-type="group" data-lava-orientation="vertical">
		<li v-for="item in items" :key="item.value" data-lava data-lava-type="item">
			{{ item.value }}
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		items: {
			type: Array,
			required: true,
			validator(value) {
				if (!Array.isArray(value)) {
					return false
				}

				for (const item of value) {
					const properties = ['value']
					for (const property of properties) {
						if (!Object.hasOwn(item, property)) return false
					}
				}

				return true
			},
		},
	},
})
</script>

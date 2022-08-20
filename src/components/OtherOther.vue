<template>
	<h2>Vertical List</h2>
	<DisplayVerticalList :items="dataVerticalList" />
	<h2>HorizontalList</h2>
	<DisplayHorizontalList :items="dataHorizontalList" />

	<h2>Popup Thing</h2>
	<div style="margin: 5px" data-lava="group">
		<button
			@click="showActionPopup()"
			@keypress="showActionPopup()"
			data-lava="item"
		>
			Show Action Popup
		</button>
	</div>
</template>

<script lang="ts">
import DisplayVerticalList from '@/components/DisplayVerticalList.vue'
import DisplayHorizontalList from '@/components/DisplayHorizontalList.vue'

import { defineComponent } from 'vue'

export default defineComponent({
	components: {
		DisplayVerticalList,
		DisplayHorizontalList,
	},
	setup() {
		const dataVerticalList = [
			{
				value: 'Alpha',
			},
			{
				value: 'Bravo',
			},
			{
				value: 'Charlie',
			},
			{
				value: 'Delta',
			},
			{
				value: 'Echo',
			},
		]

		const dataHorizontalList = [
			{
				value: 'Three',
			},
			{
				value: 'Four',
			},
			{
				value: 'Five',
			},
			{
				value: 'Six',
			},
		]

		async function showActionPopup() {
			popupPrompt.show(['a', 'b', 'c'], (choice) => {
				console.log('got something', choice)
			})
		}

		return {
			dataVerticalList,
			dataHorizontalList,

			showActionPopup,
		}
	},
})
</script>

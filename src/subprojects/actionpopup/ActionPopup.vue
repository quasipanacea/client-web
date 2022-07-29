<template>
	<dialog
		class="dialog"
		:open="dialogOpen"
		:class="{ 'dialog-shown': dialogShown }"
	>
		<div
			ref="choiceGroup"
			v-for="choice in choices"
			:key="choice.id"
			data-lava="group"
			data-lava-orientation="vertical"
		>
			<div class="choice" @click="closePopup(choice.id)" data-lava="item">
				{{ choice.name }}
			</div>
		</div>

		<!-- <fieldset>
			<legend>Select a maintenance drone:</legend>
			<div v-for="choice in choices" :key="choice.id">
				<input
					type="radio"
					:id="choice.id"
					:name="choice.name"
					:value="choice.id"
					@click="closePopup(choice.id)"
				/>
				<label :for="choice.id">{{ choice.name }}</label>
			</div>
		</fieldset> -->
	</dialog>
</template>

<script lang="ts">
import { lavaKey } from '../../subprojects/lavakey/LavakeyManager'
import { defineComponent, onMounted, ref } from 'vue'
import { popupPrompt } from './popupPrompt'

export default defineComponent({
	setup() {
		const dialogOpen = ref(false)
		const dialogShown = ref(false)
		const choiceGroup = ref(null)

		const choices = ref<
			{
				id: string
				name: string
			}[]
		>([])

		function closePopup(id: string) {
			popupPrompt.close(id)
			dialogShown.value = false
			setTimeout(() => {
				// TODO
				dialogOpen.value = false
			}, 1000)
		}

		popupPrompt.onPrompt((newChoices) => {
			choices.value = newChoices.map((item) => ({
				id: item,
				name: item,
			}))
			dialogOpen.value = true
			window.requestAnimationFrame(() => {
				dialogShown.value = true
				lavaKey.historyPush(choiceGroup)
			})
		})

		return {
			dialogOpen,
			dialogShown,
			choices,
			closePopup,
		}
	},
})
</script>

<style scoped>
.dialog {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
}
.dialog[open] {
	opacity: 0;
	transform: translateY(10px);
	transition: 100ms ease-in-out;
	transition-property: opacity, transform;
}
.dialog.dialog-shown {
	opacity: 1;
	transform: translateY(0);
	transition: 100ms ease-in-out;
	transition-property: opacity, transform;
}

.choice {
	height: 20px;
}
</style>

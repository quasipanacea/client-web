<template>
	<div
		v-if="errors.length > 0"
		style="position: fixed; inset: 25px; border-radius: 10px"
	>
		<div
			style="
				border-radius: 10px;
				height: 100%;
				background-color: var(--bulma-danger);
			"
		>
			<h1 style="font-size: 48px">Unhandled Error</h1>
			<div
				v-for="(error, i) in errors"
				style="background-color: orange; height: 90%; cursor: pointer"
				@click="errors.splice(i, 1)"
				:key="i"
			>
				<textarea
					style="width: 80%; height: 100%"
					v-model="error.reason"
				></textarea>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'

const errors = reactive<unknown[]>([])

function _onUnhandledRejection(ev: Event) {
	errors.push(ev)
}
function _onError(ev: Event) {
	errors.push(ev)
}
onMounted(() => {
	window.addEventListener('unhandledrejection', _onUnhandledRejection)
	window.addEventListener('error', _onError)
})
onUnmounted(() => {
	window.removeEventListener('unhandledrejection', _onUnhandledRejection)
	window.removeEventListener('error', _onError)
})
</script>

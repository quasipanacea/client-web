<template>
	<div
		v-if="errors.length > 0"
		style="position: fixed; top: 0; left: 0; width: 100%; height: 100%"
	>
		<div style="margin: 5px; height: 95%; background-color: #ccc">
			<h1 style="font-size: 48px; color: darkred">UNHANDLED ERROR</h1>
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

<template>
	<div v-if="errors.length > 0">
		<div
			style="
				position: fixed;
				inset: 25px;
				border-radius: 10px;
				background-color: white;
				box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
					0px 10px 15px -3px rgba(0, 0, 0, 0.1),
					0px 10px 15px -3px rgba(0, 0, 0, 0.1);
			"
		>
			<div style="padding: 5px">
				<h1 class="title as-3">Unhandled Error</h1>
			</div>
			<div>
				<div v-for="{ ev, id } in errors" :key="id">
					<code>{{
						ev.filename.split('/').at(-1)?.split('?')[0] +
						':' +
						ev.lineno +
						':' +
						ev.colno
					}}</code>
					<pre>{{ ev.error }}</pre>
					<pre>{{ ev.message }}</pre>
					<hr />
				</div>
			</div>
			<button class="button is-black m-1" @click="errors.length = 0">
				Close
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'

const errors = reactive<
	{
		ev: ErrorEvent
		id: string
	}[]
>([])

function onUnhandledRejection(ev: PromiseRejectionEvent) {
	console.error('UNHANDLED REJECTION')
	console.error(ev)
}
function onError(ev: ErrorEvent) {
	errors.push({
		ev,
		id: crypto.randomUUID(),
	})
}
onMounted(() => {
	globalThis.addEventListener('unhandledrejection', onUnhandledRejection)
	globalThis.addEventListener('error', onError)
})
onUnmounted(() => {
	globalThis.removeEventListener('unhandledrejection', onUnhandledRejection)
	globalThis.removeEventListener('error', onError)
})
</script>

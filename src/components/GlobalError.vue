<template>
	<dialog class="dialog" ref="dialogEl">
		<div class="p-0">
			<h1 class="title as-3">Unhandled Error</h1>
		</div>
		<button class="button is-black m-1" @click="errors.length = 0">
			Close
		</button>
		<div
			v-for="({ leftHeader, rightHeader, blocks }, i) in errors"
			:key="i"
			class="m-0"
		>
			<hr class="m-0" style="border: 1px solid darkslategray" />
			<div style="display: flex; justify-content: space-between">
				<code class="p-1">{{ leftHeader }}</code>
				<pre class="p-1">{{ rightHeader }}</pre>
			</div>
			<pre
				v-for="(block, j) in blocks"
				:key="j"
				class="p-2"
			><code class="p-0">{{ block }}</code></pre>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'

const dialogEl = ref<null | HTMLDialogElement>(null)
const errors = reactive<
	{
		id: string
		leftHeader: string
		rightHeader: string
		blocks: string[]
	}[]
>([])

watch(errors, (value) => {
	if (value.length > 0) {
		if (dialogEl.value && !dialogEl.value.open) {
			dialogEl.value.showModal()
		}
	} else {
		dialogEl.value?.close()
	}
})

async function onUnhandledRejection(ev: PromiseRejectionEvent) {
	const err = (ev.reason.stack || ev.reason).toString()

	errors.push({
		id: crypto.randomUUID(),
		leftHeader: '?',
		rightHeader: 'PromiseRejectionEvent',
		blocks: [err],
	})
}
function onError(ev: ErrorEvent) {
	errors.push({
		id: crypto.randomUUID(),
		leftHeader:
			ev.filename.split('/').at(-1)?.split('?')[0] +
			':' +
			ev.lineno +
			':' +
			ev.colno,
		rightHeader: 'ErrorEvent',
		blocks: [ev.error, ev.message],
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

<style scoped>
.dialog {
	width: calc(100% - 100px);
	height: calc(100% - 100px);
	padding: 0;
}
</style>

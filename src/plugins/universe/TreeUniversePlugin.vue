<script setup lang="ts">
import { onMounted } from 'vue'

let data = {}
// onMounted(async () => {
try {
	console.log('aaabds')
	fetch('/api/thing/read')
		.then((data) => data.json)
		.then((data) => console.log('dffd', data))
		.catch((err) => console.error('a', err))
	console.log('d')
} catch (err) {
	console.error(err)
} finally {
	console.log('other')
}
console.log('after')
// })
</script>

<template>
	<br /><br /><br />
	<h1>Tree Univese</h1>
	<p>{{ JSON.stringify(data) }}</p>
</template>

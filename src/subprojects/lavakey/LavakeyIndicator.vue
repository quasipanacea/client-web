<template>
	<div class="outer">
		<span id="lava-position">navigation</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {},
})
</script>

<style>
.outer {
	position: absolute;
	bottom: 0;
	right: 0;
	border: 1px solid black;
	padding: 5px;
	border-radius: 5px;
	border-bottom-right-radius: 0;
}
</style>

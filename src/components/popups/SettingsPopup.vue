<template>
	<h2 class="title mb-1 as-2">Settings</h2>
	<div class="field">
		<label class="label" for="current-plugin">Set Overview Component</label>
		<div class="control">
			<div class="select">
				<select id="current-plugin" v-model="defaultStore.currentPlugin">
					<option
						v-for="plugin in defaultStore.plugins"
						:key="plugin"
						:value="plugin"
					>
						{{ plugin }}
					</option>
				</select>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDefaultStore } from '@client/stores/default.js'

const defaultStore = useDefaultStore()
</script>

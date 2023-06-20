<template>
	<div>
		<router-link to="/">
			<button class="button is-primary">Back</button>
		</router-link>
		<div class="content" style="line-height: 1">
			<h2 class="title as-2 mb-0">Overview Plugins</h2>
			<ul v-for="plugin in overviewPlugins.values()" :key="plugin.metadata.id">
				<li>{{ plugin.metadata.id }}</li>
			</ul>
			<h2 class="title as-2 mb-0">Pod Plugins</h2>
			<ul v-for="plugin in podPlugins.values()" :key="plugin.metadata.id">
				<li>{{ plugin.metadata.id }}</li>
			</ul>
			<h2 class="title as-2 mb-0">Model Plugins</h2>
			<ul v-for="plugin in modelPlugins.values()" :key="plugin.metadata.id">
				<li>{{ plugin.metadata.id }}</li>
			</ul>
			<h2 class="title as-2 mb-0">View Plugins</h2>
			<ul v-for="plugin in viewPlugins.values()" :key="plugin.metadata.id">
				<li>{{ plugin.metadata.id }}</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { plugin } from '@quasipanacea/common/client/index.js'

const overviewPlugins = plugin.getPlugins('overview')
const podPlugins = plugin.getPlugins('pod')
const modelPlugins = plugin.getPlugins('model')
const viewPlugins = plugin.getPlugins('view')
</script>

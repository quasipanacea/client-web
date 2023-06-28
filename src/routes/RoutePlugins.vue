<template>
	<div>
		<router-link to="/">
			<button class="button is-primary">Back</button>
		</router-link>
		<div>
			<h2 class="title">Plugins</h2>
		</div>
		<div class="content" style="line-height: 1">
			<div class="box">
				<h2 class="title as-2 mb-0">Overview Plugins</h2>

				<ul
					v-for="plugin in overviewPlugins.values()"
					:key="plugin.metadata.id"
				>
					<li>{{ plugin.metadata.id }}</li>
				</ul>
			</div>

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
import { pluginClient } from '@quasipanacea/common/client/index.js'

const overviewPlugins = pluginClient.list('overview')
const podPlugins = pluginClient.list('pod')
const modelPlugins = pluginClient.list('model')
const viewPlugins = pluginClient.list('view')
</script>

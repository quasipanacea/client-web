<template>
	<div class="m-2">
		<div v-for="pluginObj of plugins" :key="pluginObj.name" class="mb-2">
			<div class="box">
				<h2 class="title mb-1">{{ pluginObj.name }}</h2>
				<div v-for="plugin in pluginObj.arr.values()" :key="plugin.metadata.id">
					<div
						class="is-flex is-justify-content-space-between is-align-items-center"
					>
						<h3 class="title is-5 m-0">
							<RouterLink :to="'/plugins/' + plugin.metadata.id">{{
								plugin.metadata.id
							}}</RouterLink>
						</h3>
						<div class="mb-1">
							<button class="button" disabled>
								<ion-icon name="checkmark-outline" class="mr-1"></ion-icon>
								Enabled
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { pluginClient } from '@quasipanacea/common/client/index.js'
import { ref } from 'vue'

const overviewPlugins = pluginClient.list('overview')
const podPlugins = pluginClient.list('pod')
const modelPlugins = pluginClient.list('model')
const viewPlugins = pluginClient.list('view')

const plugins = ref([
	{
		name: 'Overview Plugins',
		arr: overviewPlugins,
	},
	{
		name: 'Pod Plugins',
		arr: podPlugins,
	},
	{
		name: 'Model Plugins',
		arr: modelPlugins,
	},
	{
		name: 'View Plugins',
		arr: viewPlugins,
	},
])
</script>

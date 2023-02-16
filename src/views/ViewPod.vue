<template>
	<template v-if="currentPod">
		<div class="header">
			<h1 class="title">{{ currentPod.name }}</h1>
			<span class="menu">
				<ul class="pure-menu pure-menu-horizontal">
					<li class="pure-menu-item">
						<RouterLink to="/" class="pure-menu-link">Back</RouterLink>
					</li>
					<li
						class="pure-menu-item pure-menu-has-children pure-menu-allow-hover"
					>
						<a class="pure-menu-link">Actions</a>
						<ul class="pure-menu-children">
							<li class="pure-menu-item">
								<a class="pure-menu-link" @click="onDeletePod(currentPod.uuid)"
									>Delete</a
								>
							</li>
						</ul>
					</li>
				</ul>
			</span>
		</div>

		<table class="pure-table">
			<thead>
				<th>Property</th>
				<th>Value</th>
			</thead>
			<tbody>
				<tr>
					<td>UUID</td>
					<td>{{ uuid }}</td>
				</tr>
			</tbody>
		</table>
		<component v-if="currentModule" :is="currentModule" />
	</template>
</template>

<script lang="ts">
import { defineComponent, shallowRef, onMounted, ref } from 'vue'

import type * as t from '@common/types.ts'
import { api } from '@/util/api'

export default defineComponent({
	props: {
		uuid: String,
	},
	components: {},
	setup(props) {
		const currentPod = ref<t.Pod_t | null>(null)
		const currentModule = shallowRef(null)

		onMounted(async () => {
			const pod = (await api.podList.query()).pods.find(
				(item) => item.uuid === props.uuid,
			)
			if (!pod) {
				throw new Error(`Failed to find pod: ${props.uuid}`)
			}
			currentPod.value = pod

			const camelCased = pod.pluginId.replace(/-([a-z])/g, function (g) {
				return g[1].toUpperCase()
			})
			const filename = 'Pod' + camelCased[0].toUpperCase() + camelCased.slice(1)

			const module = (
				await import(`../../common/resource-symlinks/pods/${filename}.vue`)
			).default
			currentModule.value = module
		})

		return {
			currentPod,
			currentModule,
			async onDeletePod(uuid: string) {
				await api.podRemove.mutate({ uuid })
			},
		}
	},
})
</script>

<style scoped>
.title {
	font-size: 42px;
	font-weight: bold;
}

.menu {
	position: absolute;
	right: 10px;
	top: 15px;
}
</style>

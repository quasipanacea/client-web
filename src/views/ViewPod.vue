<template>
	<template v-if="pod">
		<div class="header">
			<h1 class="title">{{ pod.name }}</h1>
			<span class="menu">
				<ul class="pure-menu pure-menu-horizontal">
					<li class="pure-menu-item">
						<RouterLink to="/overview/OverviewPod" class="pure-menu-link"
							>Back</RouterLink
						>
					</li>
					<li
						class="pure-menu-item pure-menu-has-children pure-menu-allow-hover"
					>
						<a class="pure-menu-link">Actions</a>
						<ul class="pure-menu-children">
							<li class="pure-menu-item">
								<a class="pure-menu-link" @click="onDelete">Delete</a>
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
		<PodWorkaround :handler="pod.handler" />
		<!-- <component :is="dynamicComponent" /> -->
	</template>
</template>

<script lang="ts">
import { defineComponent, markRaw, ref } from 'vue'
import { useRouter } from 'vue-router'

import * as util from '../../src/util/util'
import * as utilsPlugin from '../../src/util/utilsPlugin'
import type * as schema from '../../common/schemaV2'
import * as api from '../util/clientApiV2'

import nil from '@/components/PodNull.vue'
import PodWorkaround from '../../common/util/PodWorkaround.vue'

export default defineComponent({
	props: {
		uuid: String,
	},
	components: {
		nil,
		PodWorkaround,
	},
	setup(props) {
		const router = useRouter()

		const pod = ref<null | schema.podQuery_resT>(null)

		// const dynamicComponentName = ref('nil')
		// const dynamicComponent = ref<null | unknown>(null)

		;(async () => {
			if (!props.uuid) {
				throw new Error('uuid is not truthy')
			}

			// get type
			pod.value = await api.podQuery({ uuid: props.uuid })

			// const prettyName = util.podTypeToDirname(pod.type)
			// const modules = await utilsPlugin.loadPluginVueComponents()
			// for (const module in modules) {
			// 	if (module.includes(prettyName)) {
			// 		dynamicComponentName.value = prettyName
			// 		dynamicComponent.value = modules[module]
			// 	}
			// }
		})()

		async function onDelete() {
			if (!props.uuid) return

			await api.podRemove({ uuid: props.uuid })
			router.push('/')
		}

		// const dynamicComponent = markRaw(nil)
		// const dynamicComponentName = ref('nil')
		// ;(async () => {
		// 	const modules = import.meta.glob('./File*.vue')
		// 	const component = (await modules['./FileA.vue']()).default
		// 	dynamicComponent.value = component
		// 	dynamicComponentName.value = 'FileA'

		// 	console.log(dynamicComponent)
		// })()

		return {
			pod,
			onDelete,
			// dynamicComponent,
			// dynamicComponentName,
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

<template>
	<div>
		<h1>Pod</h1>
		<RouterLink to="/overview/OverviewExperimentalPod">Back</RouterLink>
		<template v-if="queryResult">
			<p>uuid: {{ uuid }}</p>
			<p>name: {{ queryResult.name }}</p>
		</template>
		<hr />
		<PodWorkaround v-if="queryResult" :type="queryResult.type" />
		<!-- <p>{{ dynamicComponentName }}</p>
		<component :is="dynamicComponent" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, markRaw, ref } from 'vue'
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
		const queryResult = ref<null | schema.podQuery_resT>(null)

		// const dynamicComponentName = ref('nil')
		// const dynamicComponent = ref<null | unknown>(null)

		;(async () => {
			if (!props.uuid) {
				throw new Error('uuid is not truthy')
			}

			// get type
			const pod = await api.podQuery({ uuid: props.uuid })
			queryResult.value = pod

			// const prettyName = util.podTypeToDirname(pod.type)
			// const modules = await utilsPlugin.loadPluginVueComponents()
			// for (const module in modules) {
			// 	if (module.includes(prettyName)) {
			// 		dynamicComponentName.value = prettyName
			// 		dynamicComponent.value = modules[module]
			// 	}
			// }
		})()

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
			queryResult,
			// dynamicComponent,
			// dynamicComponentName,
		}
	},
})
</script>

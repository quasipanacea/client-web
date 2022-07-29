<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePluginsStore } from '../stores/plugins'
import UniversePluginWrapper from '../components/plugin-wrappers/UniverseWrapper.vue'

const router = useRouter()

const props = defineProps<{
	pluginName?: string
}>()

const pluginStore = usePluginsStore()
pluginStore.$subscribe((mutation, state) => {
	router.push({
		path: `/universe/${state.currentPlugin}`,
	})
})
</script>

<template>
	<UniversePluginWrapper :pluginName="props.pluginName" />
</template>

<template>
	<h1 class="title is-1">{{ $route.params.pluginId }}</h1>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

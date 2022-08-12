import { createRouter, createWebHistory } from 'vue-router'

import { currentPluginDefault } from '../stores/plugins'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: 'universe',
		},
		{
			path: '/universe',
			redirect: `/universe/${currentPluginDefault}`,
		},
		{
			name: 'universe',
			path: '/universe/:pluginName',
			component: () => import('@/views/UniverseView.vue'),
			props: true,
		},
		{
			name: 'document',
			path: '/document/:document',
			component: () => import('@/views/DocumentView.vue'),
		},
	],
})

export default router

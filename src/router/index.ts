import { createRouter, createWebHistory } from 'vue-router'
import { defaults } from '../defaults.ts'

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: `/overview/${defaults.defaultOverview}`,
		},
		{
			path: '/overview/:pluginName',
			component: () => import('@/views/ViewOverview.vue'),
			props: true,
		},
		{
			path: '/pod/:uuid',
			component: () => import('@/views/ViewPod.vue'),
			props: true,
		},
		{
			path: '/group/:groupUuid',
			component: () => import('@/views/ViewGroup.vue'),
			props: true,
		},
		{
			path: '/cover/:coverUuid',
			component: () => import('@/views/ViewCover.vue'),
			props: true,
		},
	],
})

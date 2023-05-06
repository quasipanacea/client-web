import { createRouter, createWebHistory } from 'vue-router'

import { defaults } from '../defaults.js'

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: `/overview/${defaults.defaultOverview}`,
		},
		{
			path: '/overview/:plugin',
			component: () => import('@client/views/ViewOverview.vue'),
			props: true,
		},
		{
			path: '/pod/:podUuid',
			component: () => import('@client/views/ViewPod.vue'),
			props: true,
		},
		{
			path: '/model/:modelUuid',
			component: () => import('@client/views/ViewModel.vue'),
			props: true,
		},
		{
			path: '/group/:groupUuid',
			component: () => import('@client/views/ViewGroup.vue'),
			props: true,
		},
		{
			path: '/cover/:coverUuid',
			component: () => import('@client/views/ViewCover.vue'),
			props: true,
		},
	],
})

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
			component: () => import('@client/routes/RouteOverview.vue'),
			props: true,
		},
		{
			path: '/pod/:podUuid',
			component: () => import('@client/routes/RoutePod.vue'),
			props: true,
		},
		{
			path: '/model/:modelUuid',
			component: () => import('@client/routes/RouteModel.vue'),
			props: true,
		},
		{
			path: '/group/:groupUuid',
			component: () => import('@client/routes/RouteGroup.vue'),
			props: true,
		},
		{
			path: '/view/:viewUuid',
			component: () => import('@client/routes/RouteView.vue'),
			props: true,
		},
	],
})

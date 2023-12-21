import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('@client/routes/RouteIndex.vue'),
		},
		{
			path: '/plugins',
			component: () => import('@client/routes/RoutePlugins.vue'),
		},
		{
			path: '/plugins/:pluginId',
			component: () => import('@client/routes/RoutePlugin.vue'),
		},
		{
			path: '/overview/:plugin',
			component: () => import('@client/routes/RouteOverview.vue'),
			props: true,
		},
		{
			path: '/overview',
			redirect: '/'
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
			path: '/view/:viewUuid',
			component: () => import('@client/routes/RouteView.vue'),
			props: true,
		},
	],
})

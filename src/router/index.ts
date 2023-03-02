import { createRouter, createWebHistory } from 'vue-router'

const defaultOverview = 'graph-cytoscape'

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: `/overview/${defaultOverview}`,
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
	],
})

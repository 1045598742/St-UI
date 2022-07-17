import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/home.vue')
	},
	{
		path: '/button',
		component: () => import('@/views/button.vue')
	},
	{
		path: '/input',
		component: () => import('@/views/input.vue')
	},
	{
		path: '/checkbox',
		component: () => import('@/views/checkbox.vue')
	},
	{
		path: '/container',
		component: () => import('@/views/container.vue')
	},
	{
		path: '/radio',
		component: () => import('@/views/radio.vue')
	},
	{
		path: '/switch',
		component: () => import('@/views/switch.vue')
	},
	{
		path: '/slider',
		component: () => import('@/views/slider.vue')
	},
	{
		path: '/progress',
		component: () => import('@/views/progress.vue')
	},
	{
		path: '/popover',
		component: () => import('@/views/popover.vue')
	},
	{
		path: '/select',
		component: () => import('@/views/select.vue')
	}
]

export default createRouter({
	history: createWebHashHistory('/'),
	routes
})

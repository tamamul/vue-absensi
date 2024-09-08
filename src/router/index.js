import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/Home.vue')
		},
		{
			path: '/pegawai/daftar',
			name: 'daftar-pegawai',
			component: () => import('../views/Pegawai/Pegawai.vue')
		},
		{
			path: '/user/profile',
			name: 'user-profile',
			component: () => import('../views/Pegawai/Pegawai.vue')
		},
		{
			path: '/user/settings',
			name: 'user-settings',
			component: () => import('../views/Pegawai/Pegawai.vue')
		},
	]
})

export default router

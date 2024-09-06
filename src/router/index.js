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
			component: () => import('../views/Pegawai.vue')
		},
	]
})

export default router

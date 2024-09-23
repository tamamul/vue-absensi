import { createRouter, createWebHistory } from 'vue-router'
// import store from '../store'

const routes = [
	// ? Dashboard
	{
		path: '/',
		name: 'dashboard',
		component: () => import('../views/Dashboard.vue')
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login.vue')
	},
	{
		path: '/pegawai/daftar',
		name: 'daftar-pegawai',
		component: () => import('../views/Pegawai/Pegawai.vue')
	},
	{
		path: '/absensi/qr-code',
		name: 'absensi-qr-code',
		component: () => import('../views/Absensi/QrCode.vue')
	},
	{
		path: '/pegawai/gaji',
		name: 'gaji-pegawai',
		component: () => import('../views/Pegawai/Gaji.vue')
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
	{
		path: '/produktifitas/workspaces',
		name: 'workspaces',
		component: () => import('../views/Produktifitas/Workspaces.vue')
	},
	{
		path: '/produktifitas/kanban/',
		name: 'kanban',
		component: () => import('../views/Produktifitas/Kanban.vue')
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router

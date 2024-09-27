import { createRouter, createWebHistory } from 'vue-router'
// import store from '../store'

const routes = [
	{
		path: '/home',
		name: 'home',
		component: () => import('../views/Home.vue')
	},
	// ? Login
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login.vue')
	},
	{
		component: () => import('../shell/DashboardShell.vue'),
		meta: { requiresAuth: false },
		children: [
			{
				path: '/dashboard',
				name: 'dashboard',
				component: () => import('../views/Dashboard.vue'),
			},
			// Pegawai
			{
				path: '/pegawai/tambah-pegawai',
				name: 'tambah-pegawai',
				component: () => import('../views/Pegawai/TambahPegawai.vue')
			},
			{
				path: '/pegawai/daftar-pegawai',
				name: 'daftar-pegawai',
				component: () => import('../views/Pegawai/DaftarPegawai.vue')
			},
			// Kehadiran
			{
				path: '/absensi/qr-code',
				name: 'absensi-qr-code',
				component: () => import('../views/Absensi/QrCode.vue')
			},
			{
				path: '/absensi/konfirmasi',
				name: 'absensi-konfirmasi',
				component: () => import('../views/Absensi/Konfirmasi.vue')
			},
			{
				path: '/pegawai/gaji',
				name: 'gaji-pegawai',
				component: () => import('../views/Pegawai/Gaji.vue')
			},
			{
				path: '/user/profile',
				name: 'user-profile',
				component: () => import('../views/Pegawai/TambahPegawai.vue')
			},
			{
				path: '/user/settings',
				name: 'user-settings',
				component: () => import('../views/Pegawai/TambahPegawai.vue')
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
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth && !store.getters['auth/auth']) {
		return next({ name: 'login' })
	}
	next()
})

export default router

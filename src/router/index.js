import { createRouter, createWebHistory } from 'vue-router'
// import store from '../store'

const routes = [
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: () => import('../views/NotFound.vue')
	},
	{
		path: '/reset-password',
		name: 'reset-password',
		component: () => import('../views/ResetPassword.vue')
	},
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
			// ? Profile
			{
				path: '/profile',
				name: 'profile',
				component: () => import('../views/Profile.vue')
			},
			{
				path: '/settings',
				name: 'settings',
				component: () => import('../views/Settings.vue')
			},
			{
				path: '/dashboard',
				name: 'dashboard',
				component: () => import('../views/Dashboard.vue'),
			},
			// ? Pegawai
			{
				path: '/pegawai',
				name: 'pegawai',
				component: () => import('../views/Perusahaan/Pegawai.vue')
			},
			// ? Gaji
			{
				path: '/gaji',
				name: 'gaji',
				component: () => import('../views/Perusahaan/Gaji.vue')
			},
			// ? Payroll
			{
				path: '/payroll',
				name: 'payroll',
				component: () => import('../views/Perusahaan/Payroll.vue')
			},
			// ? Kehadiran
			{
				path: '/absensi/qr-code',
				name: 'absensi-qr-code',
				component: () => import('../views/Absensi/QrCode.vue')
			},
			{
				path: '/absensi/konfirmasi',
				name: 'absensi-konfirmasi',
				component: () => import('../views/Absensi/Absensi.vue')
			},
			{
				path: '/user/profile',
				name: 'user-profile',
				component: () => import('../views/Pegawai/Tambah.vue')
			},
			{
				path: '/user/settings',
				name: 'user-settings',
				component: () => import('../views/Pegawai/Tambah.vue')
			},
			// Kerjaan
			{
				path: '/kerjaan/shift-kerja',
				name: 'shift-kerja',
				component: () => import('../views/ShiftKerja/ShiftKerja.vue')
			},
			{
				path: '/kerjaan/workspaces',
				name: 'workspaces',
				component: () => import('../views/Kerjaan/Workspaces.vue')
			},
			{
				path: '/kerjaan/kanban/',
				name: 'kanban',
				component: () => import('../views/Kerjaan/Kanban.vue')
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

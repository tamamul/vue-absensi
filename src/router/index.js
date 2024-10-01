import { createRouter, createWebHistory } from 'vue-router'
// import store from '../store'

const routes = [
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: () => import('../views/NotFound.vue')
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
				path: '/pegawai/list',
				name: 'list-pegawai',
				component: () => import('../views/Pegawai/Pegawai.vue')
			},
			{
				path: '/pegawai/edit/:id',
				name: 'edit-pegawai',
				component: () => import('../views/Pegawai/Edit.vue')
			},
			{
				path: '/pegawai/tambah',
				name: 'tambah-pegawai',
				component: () => import('../views/Pegawai/Tambah.vue')
			},
			// ? Gaji
			{
				path: '/gaji/list',
				name: 'list-gaji',
				component: () => import('../views/Gaji/Gaji.vue')
			},
			{
				path: '/gaji/tambah',
				name: 'tambah-gaji',
				component: () => import('../views/Gaji/Tambah.vue')
			},
			{
				path: '/gaji/edit/:id',
				name: 'edit-gaji',
				component: () => import('../views/Gaji/Edit.vue')
			},
			// ? Payroll
			{
				path: '/payroll/list',
				name: 'list-payroll',
				component: () => import('../views/Payroll/Payroll.vue')
			},
			{
				path: '/payroll/tambah',
				name: 'payroll-pegawai',
				component: () => import('../views/Payroll/Payroll.vue')
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

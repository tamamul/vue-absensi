import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const UserRoles = {
	USER: 0,
	ADMIN: 1,
};

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
	// ? Login
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login.vue')
	},
	// Home
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue')
	},

	// Group User
	{
		path: '/user',
		name: 'user',
		component: () => import('../shell/UserDashboardShell.vue'),
		meta: { requiresAuth: true, role: UserRoles.USER },
		children: [
			// ? Dashboard
			{
				path: 'dashboard',
				name: 'dashboard',
				component: () => import('../views/Users/Dashboard.vue'),
			},
			// ? User
			{
				path: 'user/profile',
				name: 'user-profile',
				component: () => import('../views/User/Profile.vue')
			},
			{
				path: 'user/settings',
				name: 'user-settings',
				component: () => import('../views/User/Settings.vue')
			},
			// ? Absensi
			{
				path: 'kehadiran/qr-code',
				name: 'kehadiran-qr-code',
				component: () => import('../views/Kehadiran/QrCode.vue')
			},
			{
				path: 'kehadiran/absensi',
				name: 'kehadiran-absensi',
				component: () => import('../views/Kehadiran/Absensi.vue')
			},
			{
				path: 'kehadiran/shift-kerja',
				name: 'shift-kerja',
				component: () => import('../views/Kehadiran/ShiftKerja.vue')
			},
			// ? Kerjaan
			{
				path: 'kerjaan/workspaces',
				name: 'workspaces',
				component: () => import('../views/Kerjaan/Workspaces.vue')
			},
			{
				path: 'kerjaan/kanban',
				name: 'kanban',
				component: () => import('../views/Kerjaan/Kanban.vue')
			},

		],
	},

	// Group Admin
	{
		path: '/admin',
		name: 'admin',
		component: () => import('../shell/AdminDashboardShell.vue'),
		meta: { requiresAuth: true, role: UserRoles.ADMIN },
		children: [
			{
				path: 'dashboard',
				name: 'admin-dashboard',
				component: () => import('../views/Admin/Dashboard.vue'),
			},
			// ? Pegawai
			{
				path: 'perusahaan/pegawai',
				name: 'admin-pegawai',
				component: () => import('../views/Admin/Perusahaan/Pegawai.vue')
			},
			// ? Gaji
			{
				path: 'perusahaan/gaji',
				name: 'admin-gaji',
				component: () => import('../views/Admin/Perusahaan/Gaji.vue')
			},
			// ? Payroll
			{
				path: 'perusahaan/payroll',
				name: 'admin-payroll',
				component: () => import('../views/Admin/Perusahaan/Payroll.vue')
			},
			{
				path: 'kehadiran/absensi',
				name: 'kehadiran-absensi',
				component: () => import('../views/Admin/Kehadiran/Absensi.vue')
			},
			{
				path: 'kehadiran/shift-kerja',
				name: 'shift-kerja',
				component: () => import('../views/Admin/Kehadiran/ShiftKerja.vue')
			},
		]
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();

	// Public routes that do not require authentication
	const publicRoutes = ['login', 'reset-password', 'not-found', 'home'];

	// If the route is public, allow access
	if (publicRoutes.includes(to.name)) {
		return next(); // Allow access to public routes
	}

	// If no auth token, fetch the token or redirect to login
	if (!authStore.authToken) {
		try {
			await authStore.getToken();
		} catch (error) {
			// If user is not authenticated and tries to access a protected route, redirect to login
			if (!publicRoutes.includes(to.name)) {
				return next({ name: 'login' });
			}
		}
	}

	// Ensure that the userRole is set before checking it
	if (authStore.userRole === null) {
		try {
			await authStore.getUser();
		} catch (error) {
			// Redirect to login if user data cannot be fetched
			return next({ name: 'login' });
		}
	}

	// If the route is public, allow access
	if (publicRoutes.includes(to.name)) {
		return next(); // Allow access to public routes
	}

	// Ensure that the userRole matches the required role
	if (to.meta.requiresAuth) {
		// Redirect to login if there's no valid token or user role
		if (!authStore.authToken || authStore.userRole === null) {
			return next({ name: 'login' });
		}

		// If the route requires a specific role and user role doesn't match
		if (to.meta.role !== undefined && authStore.userRole !== to.meta.role) {
			return next({ name: 'not-found' }); // Redirect to 404 page
		}
	}

	next(); // Allow navigation if all checks pass
});

export default router

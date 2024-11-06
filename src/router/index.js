import { createRouter, createWebHistory } from 'vue-router';
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
    // Login
    {
        path: '/login',
        name: 'login',
        meta: { requiresAuth: false },
        component: () => import('../views/Login.vue')
    },
    // Home
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    // User Routes
    {
        path: '/user',
        name: 'user',
        component: () => import('../shell/UserDashboardShell.vue'),
        meta: { requiresAuth: true, role: UserRoles.USER },
        children: [
            { path: 'dashboard', 				name: 'user-dashboard',		component: () => import('../views/Users/Dashboard.vue') },
            { path: 'user/profile', 			name: 'user-profile', 		component: () => import('../views/User/Profile.vue') },
            { path: 'user/settings', 			name: 'user-settings', 		component: () => import('../views/User/Settings.vue') },
            { path: 'kehadiran/qr-code', 		name: 'kehadiran-qr-code', 	component: () => import('../views/Kehadiran/QrCode.vue') },
            { path: 'kehadiran/absensi', 		name: 'kehadiran-absensi', 	component: () => import('../views/Kehadiran/Absensi.vue') },
            { path: 'kehadiran/shift-kerja', 	name: 'shift-kerja', 		component: () => import('../views/Kehadiran/ShiftKerja.vue') },
            { path: 'kerjaan/workspaces', 		name: 'workspaces', 		component: () => import('../views/Kerjaan/Workspaces.vue') },
            { path: 'kerjaan/kanban',			name: 'kanban', 			component: () => import('../views/Kerjaan/Kanban.vue') },
        ]
    },
    // Admin Routes
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../shell/AdminDashboardShell.vue'),
        meta: { requiresAuth: true, role: UserRoles.ADMIN },
        children: [
            { path: 'dashboard', 				name: 'admin-dashboard', 			component: () => import('../views/Admin/Dashboard.vue') },
            { path: 'perusahaan/pegawai', 		name: 'admin-pegawai', 				component: () => import('../views/Admin/Perusahaan/Pegawai.vue') },
            { path: 'perusahaan/gaji', 			name: 'admin-gaji', 				component: () => import('../views/Admin/Perusahaan/Gaji.vue') },
            { path: 'perusahaan/payroll', 		name: 'admin-payroll', 				component: () => import('../views/Admin/Perusahaan/Payroll.vue') },
            { path: 'kehadiran/absensi', 		name: 'admin-kehadiran-absensi', 	component: () => import('../views/Admin/Kehadiran/Absensi.vue') },
            { path: 'kehadiran/shift-kerja',	name: 'admin-shift-kerja', 			component: () => import('../views/Admin/Kehadiran/ShiftKerja.vue') },
        ]
    }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach(async (to) => {
    const authStore = useAuthStore();
    const isPublicRoute = !to.meta.requiresAuth; // Public routes don't require authentication
    const hasToken = authStore.authToken;

    // Allow access if the route is public
    if (isPublicRoute) return true;

    // Check authentication
    if (!hasToken) {
        await authStore.getToken();
        if (!authStore.authToken) {
            return { name: 'login' }; // Redirect to login if not authenticated
        }
    }

    // Fetch user data if it's not already available
    if (!authStore.userRole) {
        try {
            await authStore.getUser();
        } catch {
            return { name: 'login' }; // Redirect to login if fetching user data fails
        }
    }

    // Check for required role on protected routes
    if (to.meta.requiresAuth && to.meta.role !== undefined && authStore.userRole !== to.meta.role) {
        return { name: 'not-found' }; // Redirect to 404 if user role doesn’t match
    }

    // If all checks pass, allow navigation
    return true;
});

export default router;
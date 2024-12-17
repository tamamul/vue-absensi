import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const UserRoles = {
  USER: 0,
  ADMIN: 1,
};

const routes = [
  // Home
  { path: "/", name: "home", component: () => import("../views/Home.vue") },
  // Login
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  // Reset Password
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("../views/ResetPassword.vue"),
  },
  // 404
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFound.vue"),
  },
  // KANBAN
  {
    path: "/kerjaan/workspaces",
    name: "workspaces",
    component: () => import("../views/KANBAN/Workspaces.vue"),
  },
  {
    path: "/kerjaan/kanban",
    name: "kanban",
    component: () => import("../views/KANBAN/Kanban.vue"),
  },

  // User Routes
  {
    path: "/user",
    name: "user",
    component: () => import("../shell/DashboardShell.vue"),
    meta: { requiresAuth: true, role: UserRoles.USER },
    children: [
      {
        path: "dashboard",
        name: "user-dashboard",
        component: () => import("../views/Users/Dashboard.vue"),
      },
      {
        path: "profile",
        name: "user-profile",
        component: () => import("../views/Users/Profile.vue"),
      },
      {
        path: "settings",
        name: "user-settings",
        component: () => import("../views/Users/Settings.vue"),
      },
      {
        path: "qr-code",
        name: "user-qr-code",
        component: () => import("../views/Users/QrCode.vue"),
      },
      {
        path: "gaji",
        name: "user-gaji",
        component: () => import("../views/Users/Gaji.vue"),
      },
    ],
  },
  // Admin Routes
  {
    path: "/admin",
    name: "admin",
    component: () => import("../shell/DashboardShell.vue"),
    meta: { requiresAuth: true, role: UserRoles.ADMIN },
    children: [
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import("../views/Admin/Dashboard.vue"),
      },
      {
        path: "profile",
        name: "admin-profile",
        component: () => import("../views/Admin/Profile.vue"),
      },
      {
        path: "settings",
        name: "admin-settings",
        component: () => import("../views/Admin/Settings.vue"),
      },
      {
        path: "perusahaan/pegawai",
        name: "admin-pegawai",
        component: () => import("../views/Admin/Perusahaan/Pegawai.vue"),
      },
      {
        path: "perusahaan/gaji",
        name: "admin-gaji",
        component: () => import("../views/Admin/Perusahaan/Gaji.vue"),
      },
      {
        path: "perusahaan/payroll",
        name: "admin-payroll",
        component: () => import("../views/Admin/Perusahaan/Payroll.vue"),
      },
      {
        path: "kehadiran/absensi",
        name: "admin-kehadiran-absensi",
        component: () => import("../views/Admin/Kehadiran/Absensi.vue"),
      },
      {
        path: "kehadiran/jadwal",
        name: "admin-jadwal",
        component: () => import("../views/Admin/Kehadiran/Jadwal.vue"),
      },
      // { path: 'kehadiran/shift-kerja',	name: 'admin-shift-kerja', 			component: () => import('../views/Admin/Kehadiran/ShiftKerja.vue') },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const isPublicRoute = !to.meta.requiresAuth;
  const hasToken = authStore.authToken;

  if (isPublicRoute) return true;

  if (!hasToken) {
    await authStore.getToken();
    if (!authStore.authToken) {
      return { name: "login" };
    }
  }

  if (!authStore.userRole) {
    try {
      await authStore.getUser();
    } catch {
      return { name: "login" };
    }
  }

  if (
    to.meta.requiresAuth &&
    to.meta.role !== undefined &&
    authStore.userRole !== to.meta.role
  ) {
    return { name: "not-found" };
  }

  return true;
});

export default router;

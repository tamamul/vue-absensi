<template>
    <!-- Page Wrapper -->
    <div class="flex h-screen overflow-hidden bg-[#F1F5F9]">

        <!-- Sidebar -->
        <Sidebar :sidebarItems="sidebarItems" :sidebarToggle="sidebarToggle" @toggleSidebar="callback"></Sidebar>

        <!-- Content Area -->
        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

            <!-- Navbar -->
            <Navbar @toggleSidebar="callback"></Navbar>

            <!-- Main Content Area -->
            <RouterView></RouterView>

        </div>

    </div>
</template>

<script>
import router from '@/router'
import { useAuthStore } from '@/stores/auth';

export default {
    name: 'DashboardShell',
    inject: ['default'],
    data() {
        return {
            authStore: useAuthStore(),
            sidebarToggle: false,
            sidebarItems: [
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Dashboard',
                            icon: 'pi pi-home',
                            route: '/dashboard'
                        }
                    ]
                },
                {
                    label: 'Absensi',
                    items: [
                        {
                            label: 'Konfirmasi Absensi',
                            icon: 'pi pi-check-square',
                            route: '/absensi/konfirmasi'
                        },
                        {
                            label: 'QR CODE',
                            icon: 'pi pi-qrcode',
                            route: '/absensi/qr-code'
                        },
                    ]
                },
                {
                    label: 'Pegawai',
                    items: [
                        {
                            label: 'Pegawai',
                            icon: 'pi pi-users',
                            route: '/pegawai/list'
                        },
                        {
                            label: 'Gaji',
                            icon: 'pi pi-wallet',
                            route: '/pegawai/gaji'
                        },
                        {
                            label: 'Payroll',
                            icon: 'pi pi-credit-card',
                            route: '/pegawai/payroll'
                        },
                    ]
                },
                {
                    label: 'Produktifitas',
                    items: [
                        {
                            label: 'Workspaces',
                            icon: 'pi pi-briefcase',
                            route: '/produktifitas/workspaces'
                        },
                        {
                            label: 'Kanban',
                            icon: 'pi pi-list',
                            route: '/produktifitas/kanban'
                        },
                    ]
                },
            ],
        }
    },
    methods: {
        // Sidebar
        callback() {
            this.sidebarToggle = !this.sidebarToggle;
        },
        // Check if login
        ifLogin() {
            const token = localStorage.getItem('token');
            
            if (!token) {
                router.push({name: 'login'});
            }
        },
        // get user
        // async getUser() {
        //     await this.authStore.getUser()
        // }
    },
    mounted() {
        // this.getUser()
        this.ifLogin()
    },
}
</script>

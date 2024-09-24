<template>
    <!-- Page Wrapper -->
    <div class="flex h-screen overflow-hidden bg-[#F1F5F9]">

        <!-- Sidebar -->
        <Sidebar :sidebarItems="sidebarItems" :sidebarToggle="sidebarToggle" @toggleSidebar="callback"></Sidebar>

        <!-- Content Area -->
        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

            <!-- Navbar -->
            <Navbar :userItems="userItems" @toggleSidebar="callback"></Navbar>

            <!-- Main Content Area -->
            <div class="grid grid-cols-12 gap-5 m-5">
                <RouterView></RouterView>
            </div>

        </div>

    </div>
</template>

<script>
import router from '@/router'
export default {
    name: 'DashboardShell',
    inject: ['default'],
    data() {
        return {
            token: '',
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
                            label: 'Daftar Pegawai',
                            icon: 'pi pi-users',
                            route: '/pegawai/daftar'
                        },
                        {
                            label: 'Gaji',
                            icon: 'pi pi-wallet',
                            route: '/pegawai/gaji'
                        }
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
            userItems: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    // route: '/profile'
                },
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    // route: '/settings'
                },
                {
                    separator: true
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    route: '/login'
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
            this.token = localStorage.getItem('token');
            if (!this.token) {
                router.push({name: 'login'});
            }
        }
    },
    mounted() {
        this.ifLogin()
    },
}
</script>

<style></style>
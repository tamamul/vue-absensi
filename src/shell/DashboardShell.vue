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
export default {
    name: 'DashboardShell',
    inject: ['default'],
    data() {
        return {
            // visible: false,
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
    // computed: {
    //     ...mapGetters({
    //         role: 'auth/role'
    //     }),
    // },
    methods: {
        callback() {
            this.sidebarToggle = !this.sidebarToggle;
        },
        // ...mapActions({
        //     logout: 'auth/logout'
        // }),
        // toggleSidebar() {
        //     this.visibleSidebar = !this.visibleSidebar;
        // },
        // onLogout() {
        //     this.logout().then(() => {
        //         console.log('Logged out');
        //         this.$router.push({ name: 'login' });
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        // }
    },
}
</script>

<style></style>
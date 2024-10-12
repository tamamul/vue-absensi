<template>
    <aside
        :class="sidebarToggle ? 'translate-x-0' : '-translate-x-full'"
        class="absolute left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 w-72 shadow-md text-def">

        <!-- ? Sidebar Header -->
        <div class="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
            <RouterLink to="/dashboard" class="flex gap-2 items-center font-semibold text-xl icon-nav">
                <img src="../assets/app-logo.png" alt="Logo" class="w-12" />
                Absensi Qr Code
            </RouterLink>

            <button class="block lg:hidden" :class="{'lg:block' : sidebarToggle}" @click="$emit('toggleSidebar')">
                <i class="pi pi-arrow-left text-lg"></i>
            </button>
        </div>

        <div v-if="isLoading" class="flex flex-col overflow-y-auto duration-300 ease-linear">
            <nav class="mt-5 px-4 lg:mt-9 lg:px-6">

                <!-- Menu Group -->

                <div v-for="n in 3" :key="n">
                    <h3 class="mb-4 ml-4 text-sm font-medium">
                        <Skeleton height="1.5rem" width="50%" />
                    </h3>

                    <ul class="mb-6 flex flex-col gap-1">
                        <!-- Skeleton Menu Item -->
                        <li v-for="i in 4" :key="i">
                            <div class="group relative flex items-center gap-2 rounded-sm px-4 py-2 duration-300 ease-in-out">
                                <Skeleton shape="circle" width="2rem" height="2rem" />
                                <Skeleton height="2rem" width="80%" />
                            </div>
                        </li>
                    </ul>
                </div>

            </nav>
        </div>

        <div v-else class="flex flex-col overflow-y-auto duration-300 ease-linear">

            <!-- Sidebar Menu -->
            <nav v-if="isAdmin" class="mt-5 px-4 lg:mt-9 lg:px-6">

                <!-- Menu Group -->
                <div v-for="item in sidebarItemsAdmin" :key="item.label">
                    <h3 class="mb-4 ml-4 text-sm font-medium">{{item.label}}</h3>

                    <ul class="mb-6 flex flex-col gap-1">
                        <!-- Menu Item -->
                        <li v-for="menuItem in item.items" :key="menuItem.label" >
                            <RouterLink class="group relative flex items-center gap-2 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out menu"
                                :to="menuItem.route"
                            >
                                <i class="text-lg" :class="menuItem.icon"></i>

                                {{menuItem.label}}
                            </RouterLink>
                        </li>
                    </ul>
                </div>

            </nav>

            <nav v-else class="mt-5 px-4 lg:mt-9 lg:px-6">

                <!-- Menu Group -->
                <div v-for="item in sidebarItemsUser" :key="item.label">
                    <h3 class="mb-4 ml-4 text-sm font-medium">{{item.label}}</h3>

                    <ul class="mb-6 flex flex-col gap-1">
                        <!-- Menu Item -->
                        <li v-for="menuItem in item.items" :key="menuItem.label" >
                            <RouterLink class="group relative flex items-center gap-2 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out menu"
                                :to="menuItem.route"
                            >
                                <i class="text-lg" :class="menuItem.icon"></i>

                                {{menuItem.label}}
                            </RouterLink>
                        </li>
                    </ul>
                </div>

            </nav>

        </div>
    </aside>

</template>

<script>
import { useAuthStore } from '@/stores/auth';

// ? ambil dulu info admin dari authStore terus tentukan sidebarItems mana yang di pakai
export default {
    props:['sidebarToggle'],
    data() {
        return {
            authStore: useAuthStore(),
            sidebarItemsUser: [
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
                    label: 'Kehadiran',
                    items: [
                        {
                            label: 'QR CODE',
                            icon: 'pi pi-qrcode',
                            route: '/kehadiran/qr-code'
                        },
                    ]
                },
                {
                    label: 'Kerjaan',
                    items: [
                        {
                            label: 'Workspaces',
                            icon: 'pi pi-briefcase',
                            route: '/kerjaan/workspaces'
                        },
                        {
                            label: 'Kanban',
                            icon: 'pi pi-list',
                            route: '/kerjaan/kanban'
                        },
                    ]
                },
            ],
            sidebarItemsAdmin: [
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Dashboard',
                            icon: 'pi pi-home',
                            route: '/admin/dashboard'
                        }
                    ]
                },
                {
                    label: 'Kehadiran',
                    items: [
                        {
                            label: 'Konfirmasi Absensi',
                            icon: 'pi pi-check-square',
                            route: '/admin/kehadiran/absensi'
                        },
                        {
                            label: 'Shift Kerja',
                            icon: 'pi pi-calendar-clock',
                            route: '/admin/kehadiran/shift-kerja'
                        },
                    ]
                },
                {
                    label: 'Perusahaan',
                    items: [
                        {
                            label: 'Pegawai',
                            icon: 'pi pi-users',
                            route: '/admin/perusahaan/pegawai'
                        },
                        {
                            label: 'Gaji',
                            icon: 'pi pi-wallet',
                            route: '/admin/perusahaan/gaji'
                        },
                        {
                            label: 'Payroll',
                            icon: 'pi pi-credit-card',
                            route: '/admin/perusahaan/payroll'
                        },
                    ]
                },
                {
                    label: 'Kerjaan',
                    items: [
                        {
                            label: 'Workspaces',
                            icon: 'pi pi-briefcase',
                            route: '/admin/kerjaan/workspaces'
                        },
                        {
                            label: 'Kanban',
                            icon: 'pi pi-list',
                            route: '/admin/kerjaan/kanban'
                        },
                    ]
                },
            ],
            isLoading: true,
            isAdmin: ''
        }
    },
    emits: ['toggleSidebar'],
    methods: {
        toggleSidebar() {
            this.$emit('toggleSidebar')
        },

        async getAdmin() {
            await this.authStore.getUser()

            this.isAdmin  = this.authStore.authUser.data.is_admin

            console.log('sidebar ngambil lagi')
            this.isLoading = false
        },
    },
    mounted() {
        this.getAdmin()
    },
}
</script>

<style>
    .icon-nav {
        color: #334155;
        @apply font-medium
    }
</style>
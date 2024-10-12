<template>
    <!-- Page Wrapper -->
    <div class="flex h-screen overflow-hidden bg-[#F1F5F9]">

        <!-- Sidebar -->
        <Sidebar :sidebarToggle=sidebarToggle @toggleSidebar="callback"></Sidebar>

        <!-- Content Area -->
        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

            <!-- Navbar -->
            <Navbar @toggleSidebar="callback"></Navbar>

            <!-- Main Content Area -->
            <RouterView></RouterView>

            <BottomNav></BottomNav>
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
            sidebarToggle:false,
            authStore: useAuthStore(),
        }
    },
    methods: {
        // Sidebar
        callback() {
            this.sidebarToggle = !this.sidebarToggle;
        },
        // Check if login
        // ifLogin() {
        //     const token = localStorage.getItem('token');
            
        //     if (!token) {
        //         router.push({name: 'login'});
        //     }
        // },
        // get user
        // async getUser() {
        //     await this.authStore.getUser()
        // }
    },
    mounted() {
        // this.getUser()
        // this.ifLogin()
    },
}
</script>

<template>
    <!-- Page Wrapper -->
    <div class="flex h-screen overflow-hidden bg-[#F1F5F9]">

        <!-- Sidebar -->
        <SkeletonSidebar v-if="isLoading" :sidebarToggle=sidebarToggle @toggleSidebar="callback" ></SkeletonSidebar>
        <Sidebar v-else :sidebarToggle=sidebarToggle @toggleSidebar="callback" :dataRole="dataRole"></Sidebar>

        <!-- Content Area -->
        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

            <!-- Navbar -->
            <SkeletonNavbar v-if="isLoading" @toggleSidebar="callback" :dataRole="dataRole" :dataUser="dataUser"></SkeletonNavbar>
            <Navbar v-else @toggleSidebar="callback" :dataRole="dataRole" :dataUser="dataUser"></Navbar>

            <!-- Main Content Area -->
            <RouterView></RouterView>

            <SkeletonBottomNav v-if="isLoading"></SkeletonBottomNav>
            <BottomNav v-else :dataRole="dataRole" />
        </div>

    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
export default {
    name: 'DashboardShell',
    inject: ['default'],
    data() {
        return {
            sidebarToggle:false,
            authStore: useAuthStore(),
            dataUser : 0,
            dataRole : 0,
            isLoading: true
        }
    },
    methods: {
        callback() {
            this.sidebarToggle = !this.sidebarToggle;
        },
        async getUser() {
            await this.authStore.getUser();
            this.dataUser = this.authStore.authUser;
            this.dataRole = this.authStore.userRole;
        },
    },
    async mounted() {
        await this.getUser();
        this.isLoading = false;
    }

}
</script>

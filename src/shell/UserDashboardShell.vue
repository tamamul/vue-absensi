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
export default {
    name: 'UserDashboardShell',
    inject: ['default'],
    data() {
        return {
            sidebarToggle:false,
        }
    },
    methods: {
        // Sidebar
        callback() {
            this.sidebarToggle = !this.sidebarToggle;
        },
    },
}
</script>

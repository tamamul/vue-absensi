<template>
    <aside
        :class="sidebarToggle ? 'translate-x-0' : '-translate-x-full'"
        class="absolute left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 w-72 shadow-md text-def">

        <!-- ? Sidebar Header -->
        <div class="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
            <RouterLink :to="isAdmin ? '/admin/dashboard' : '/user/dashboard'" class="flex gap-2 items-center font-semibold text-xl icon-nav">
                <img src="../assets/app-logo.png" alt="Logo" class="w-12" />
                Absensi Qr Code
            </RouterLink>

            <button class="block lg:hidden" :class="{'lg:block' : sidebarToggle}" @click="$emit('toggleSidebar')">
                <i class="pi pi-arrow-left text-lg"></i>
            </button>
        </div>

        <div class="flex flex-col overflow-y-auto duration-300 ease-linear">
            <!-- Sidebar Menu -->
            <AdminSidebar v-if="isAdmin === 1" class="mt-5 px-4 lg:mt-9 lg:px-6"></AdminSidebar>

            <UserSidebar v-else></UserSidebar>
        </div>
    </aside>

</template>

<script>
import { useAuthStore } from '@/stores/auth';

// ? ambil dulu info admin dari authStore terus tentukan sidebarItems mana yang di pakai
export default {
    emits: ['toggleSidebar'],
    props: { 
        'sidebarToggle' : Boolean,
        'dataRole' : Number
    },
    data() {
        return {
            authStore: useAuthStore(),
            linkDashboard: true,
            isAdmin: 0
        }
    },
    // watch: {
    //     dataRole(newRole) {
    //         this.isAdmin = newRole;
    //         console.log(`Data role updated: ${this.isAdmin}`);
    //         this.isLoading = false;
    //     },
    // },
    methods: {
        toggleSidebar() {
            this.$emit('toggleSidebar')
        },

        async getAdmin() {
            if (this.dataRole !== null) {
                this.isAdmin = this.dataRole;
            } else {
                console.warn('Data role not yet available.');
            }
        },
    },
    async mounted() {
        await this.getAdmin()
    },
}
</script>

<style>
    .icon-nav {
        color: #334155;
        @apply font-medium
    }
</style>
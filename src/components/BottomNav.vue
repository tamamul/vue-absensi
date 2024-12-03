<template>
	<nav class="shadow-md h-20 block lg:hidden fixed bg-white w-full bottom-0 z-50">
        <!-- Menus -->
        <AdminBottomNav v-if="isAdmin" />

        <!-- Menus -->
        <UserBottomNav v-else />
    </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
    props: ['dataRole'],
	data() {
		return {
			isLoading: true,
            isAdmin: ''
		}
	},
	methods: {
        async getAdmin() {
            this.isAdmin  = this.dataRole
            this.isLoading = false
        },
    },
    mounted() {
        this.getAdmin()
    },
}
</script>

<style>
.router-link-active.mobile{
	@apply bg-white border-t-[#3B82F6] text-[#3B82F6]
}
</style>
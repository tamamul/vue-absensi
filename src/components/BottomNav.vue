<template>
	<div v-if="isloading">
		<div v-for="item in 3" :key="item">
			<Skeleton height="2.5rem" width="4rem"></Skeleton>
			<Skeleton height="2.5rem" width="4rem"></Skeleton>
			<Skeleton height="2.5rem" width="4rem"></Skeleton>
		</div>
	</div>
	<nav v-else class="shadow-md h-20 block lg:hidden fixed bg-white w-full bottom-0 z-50">
        <!-- Menus -->
        <div v-if="isAdmin" class="flex gap-4 items-center justify-around">
            <div v-for="item in menuItemsAdmin" :key="item.label">
                <RouterLink :to="item.route" class="mobile w-24 flex flex-col gap-2 items-center pt-3 px-4 border-t-4 border-t-white transition-all font-medium text-lg bg-white hover:border-t-4 hover:border-t-[#3B82F6] hover:text-[#3B82F6]">
                    <i :class="item.icon" class="text-2xl font-medium"></i>
                    <h3 class="font-medium">{{ item.label }}</h3>
                </RouterLink>
            </div>
        </div>

        <!-- Menus -->
        <div v-else class="flex gap-4 items-center justify-around">
            <div v-for="item in menuItemsUser" :key="item.label">
                <RouterLink :to="item.route" class="mobile w-24 flex flex-col gap-2 items-center pt-3 px-4 border-t-4 border-t-white transition-all font-medium text-lg bg-white hover:border-t-4 hover:border-t-[#3B82F6] hover:text-[#3B82F6]">
                    <i :class="item.icon" class="text-2xl font-medium"></i>
                    <h3 class="font-medium">{{ item.label }}</h3>
                </RouterLink>
            </div>
        </div>
    </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
	data() {
		return {
			authStore: useAuthStore(),
			menuItemsUser: [
				{ label: 'Dashboard', icon: 'pi pi-home', route:'/user/dashboard' },
				{ label: 'Absen', icon: 'pi pi-qrcode', route:'/user/qr-code' },
				{ label: 'Profile', icon: 'pi pi-user', route:'/user/profile' },
			],
			menuItemsAdmin: [
				{ label: 'Dashboard', icon: 'pi pi-home', route:'/admin/dashboard' },
				{ label: 'Absen', icon: 'pi pi-qrcode', route:'/admin/qr-code' },
				{ label: 'Profile', icon: 'pi pi-user', route:'/admin/profile' },
			],
			isLoading: true,
            isAdmin: ''
		}
	},
	methods: {
        async getAdmin() {
            await this.authStore.getUser()

            this.isAdmin  = this.authStore.authUser.data.is_admin

            console.log('buttom nav ngambil lagi')
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
<template>
	<nav class="shadow-md h-20 block lg:hidden fixed bg-white w-full bottom-0 z-50">
        <!-- Menus -->
        <div class="flex gap-4 items-center justify-around">
            <div v-for="item in menuItems" :key="item.label">
                <RouterLink :to="item.route" class="mobile w-24 flex flex-col gap-2 items-center pt-3 px-4 border-t-4 border-t-white transition-all font-medium text-lg bg-white hover:border-t-4 hover:border-t-[#3B82F6] hover:text-[#3B82F6]">
                    <i :class="item.icon" class="text-2xl font-medium"></i>
                    <h3 class="font-medium">{{ item.label }}</h3>
                </RouterLink>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
	data() {
		return {
			menuItems: [
				{ label: 'Dashboard', icon: 'pi pi-home', route:'/dashboard' },
				{ label: 'Kode', icon: 'pi pi-qrcode', route:'/absensi/qr-code' },
				{ label: 'Profile', icon: 'pi pi-user', route:'/user/profile' },
			]
		}
	},
}
</script>

<style>
.router-link-active.mobile{
	@apply bg-white
}
</style>
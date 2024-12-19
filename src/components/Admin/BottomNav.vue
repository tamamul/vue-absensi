<template>
	<div class="flex gap-4 items-center justify-around">
		<div v-for="item in menuItemsAdmin" :key="item.label">
			<RouterLink :to="item.route" class="mobile w-24 flex flex-col gap-2 items-center pt-3 px-4 border-t-4 border-t-white transition-all font-medium text-lg bg-white hover:border-t-4 hover:border-t-[#3B82F6] hover:text-[#3B82F6]">
				<i :class="item.icon" class="text-2xl font-medium"></i>
				<h3 class="font-medium">{{ item.label }}</h3>
			</RouterLink>
		</div>
	</div>
</template>

<script>
export default {
	name:'AdminBottomNav',
	inject:['default'],
	data() {
		return {
			menuItemsAdmin: [
				{ label: 'Dashboard', 	icon: 'pi pi-home', route:'/admin/dashboard' },
				{ label: 'Absen', 		icon: 'pi pi-qrcode', route:'/admin/kehadiran' },
				{ label: 'Profile', 	icon: 'pi pi-user', route:'/admin/profile' },
			],
		}
	},
	methods: {
	},
	mounted() {
	},
}
</script>
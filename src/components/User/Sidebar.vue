<template>
	<!-- Menu Group -->
	<nav class="mt-5 px-4 lg:mt-9 lg:px-6">
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

</template>

<script>
export default {
	name:'UserSidebar',
	inject:['default'],
	data() {
		return {
			sidebarItemsUser: [
                {
                    label: 'User',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-home', route: '/user/dashboard'},
                        { label: 'QR CODE', icon: 'pi pi-qrcode', route: '/user/qr-code' },
                        { label: 'Shift Kerja', icon: 'pi pi-briefcase', route: '/user/shift-kerja' },
                        { label: 'Gaji', icon: 'pi pi-wallet', route: '/user/gaji' },
                    ]
                },
            ],
		}
	},
	methods: {
	},
	mounted() {
	},
}
</script>
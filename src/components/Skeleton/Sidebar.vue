<template>
	<aside
        :class="sidebarToggle ? 'translate-x-0' : '-translate-x-full'"
        class="absolute left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 w-72 shadow-md text-def">

        <!-- ? Sidebar Header -->
        <div class="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
            <RouterLink :to="isAdmin ? '/admin/dashboard' : '/user/dashboard'" class="flex gap-2 items-center font-semibold text-xl icon-nav">
                <img src="../../assets/app-logo.png" alt="Logo" class="w-12" />
                Absensi Qr Code
            </RouterLink>

            <button class="block lg:hidden" :class="{'lg:block' : sidebarToggle}" @click="$emit('toggleSidebar')">
                <i class="pi pi-arrow-left text-lg"></i>
            </button>
        </div>

        <div class="flex flex-col overflow-y-auto duration-300 ease-linear">
            <nav class="mt-5 px-4 lg:mt-9 lg:px-6">
                <!-- Menu Group -->
                <div v-for="n in 3" :key="n">
                    <h3 class="mb-2 ml-4 text-sm font-medium">
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
    </aside>
		
</template>

<script>
export default {
	name:'SkeletonSidebar',
	props: ['sidebarToggle', 'isAdmin'],
	data() {
		return {
		}
	},
	methods: {
	},
	mounted() {
	},
}
</script>
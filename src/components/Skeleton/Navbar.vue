<template>
	<header class="sticky top-0 z-40 flex w-full bg-white drop-shadow-1 shadow-md text-def">
        <div class="flex flex-grow items-center justify-between lg:justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">

            <!-- Menus -->
            <div class="flex items-center gap-2 sm:gap-4 lg:hidden">

                <button
                    class="z-50 flex rounded-sm border border-stroke bg-white p-1 shadow-sm w-12 h-12 items-center justify-center lg:hidden">
                    <i class="pi pi-bars text-2xl"></i>
                </button>

                <RouterLink class="block flex-shrink-0 lg:hidden icon-nav" to="/dashboard">
                    <img src="@/assets/app-logo.png" alt="Logo" class="w-12 h-12"/>
                </RouterLink>

            </div>

            <!-- Search If needed -->
            <!-- <div class="hidden sm:block border-2 h-full px-3 rounded-full">
                <form action="" method="POST" class="flex justify-center h-full">
                    <div class="relative flex items-center">
                        <button class="flex">
                            <i class="pi pi-search text-lg"></i>
                        </button>

                        <input type="text" placeholder="Search nothing"
                            class="w-full bg-transparent pl-4 pr-8 focus:outline-none xl:w-[500px]" />
                    </div>
                </form>
            </div> -->

            <!-- User Area -->
            <div class="flex items-center gap-3">
                <div class="relative">

                    <button class="flex items-center gap-4" aria-haspopup="true" aria-controls="overlay_tmenu">
                        <span class="flex flex-col items-end gap-1">
                            <Skeleton height="1rem" width="7rem"/>
                            <Skeleton height="0.8rem" width="5rem"/>
                        </span>

                        <span class="h-12 w-12 rounded-full">
                            <img src="@/assets/app-logo.png"
                                alt="nama-user"
                                class="rounded-full" />
                        </span>

                        <i class="hidden fill-current sm:block transition-all ease-in-out pi pi-angle-down"></i>
                    </button>
                </div>
            </div>

        </div>
    </header>
</template>

<script>
export default {
	name:'SkeletonNavbar',
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
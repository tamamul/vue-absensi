<template>
    <header class="sticky top-0 z-40 flex w-full bg-white drop-shadow-1 shadow-md text-def">
        <div class="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">

            <!-- Menus -->
            <div class="flex items-center gap-2 sm:gap-4 lg:hidden">

                <button
                    class="z-50 flex rounded-sm border border-stroke bg-white p-1 shadow-sm w-12 h-12 items-center justify-center lg:hidden"
                    @click="$emit('toggleSidebar')">
                    <i class="pi pi-bars text-2xl"></i>
                </button>

                <RouterLink class="block flex-shrink-0 lg:hidden icon-nav" to="/">
                    <img src="../assets/app-logo.png" alt="Logo" class="w-12 h-12"/>
                </RouterLink>

            </div>

            <!-- Search If needed -->
            <div class="hidden sm:block border-2 h-full px-3 rounded-full">
                <form action="" method="POST" class="flex justify-center h-full">
                    <div class="relative flex items-center">
                        <button class="flex">
                            <i class="pi pi-search text-lg"></i>
                        </button>

                        <input type="text" :placeholder="$route.fullPath"
                            class="w-full bg-transparent pl-4 pr-8 focus:outline-none xl:w-[500px]" />
                    </div>
                </form>
            </div>

            <!-- User Area -->
            <div class="flex items-center gap-3">
                <div class="relative">

                    <button class="flex items-center gap-4" @click="toggleDropdown">
                        <span class="hidden text-right lg:block">
                            <span class="block text-sm font-medium text-black">Arrayyan</span>
                            <span class="block text-xs font-medium">Frontend Developer</span>
                        </span>

                        <span class="h-12 w-12 rounded-full">
                            <img src="../assets/app-logo.png"
                                alt="nama-user"
                                class="rounded-full" />
                        </span>

                        <i :class="{'rotate-180' : dropdownOpen}" class="hidden fill-current sm:block transition-all ease-in-out pi pi-angle-down"></i>
                    </button>

                    <!-- Dropdown User Menu -->
                    <div v-show="dropdownOpen" class="absolute right-0 mt-4 flex w-62 flex-col rounded-sm border bg-white shadow-md">
                        <ul class="flex flex-col gap-5 border-b px-6 py-7">
                            <li v-for="item in userItems" :key="item.route">
                                <RouterLink :to="item.route" class="font-medium flex items-center gap-3">
                                    <i :class="item.icon" class="text-lg"></i>
                                    {{item.label}}
                                </RouterLink>
                            </li>
                        </ul>

                        <!-- Logout -->
                        <button class="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:color-primary lg:text-base">
                            <i class="pi pi-sign-out"></i>
                            Log Out
                        </button>
                    </div>

                </div>
            </div>

        </div>
    </header>
</template>

<script>
export default {
    emits: ['toggleSidebar'],
    data() {
        return {
            dropdownOpen:false,
            userItems: [
                {
                    label: 'Profile',
                    route: '/profile',
                    icon: 'pi pi-user'
                },
                {
                    label: 'Settings',
                    route: '/settings',
                    icon: 'pi pi-cog'
                }
            ]
        }
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        }
    },
}
</script>

<style>
    .icon-nav {
        background: none;
    }
</style>
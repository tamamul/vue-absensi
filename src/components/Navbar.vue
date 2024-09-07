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

                        <input type="text" placeholder="Type to search..."
                            class="w-full bg-transparent pl-4 pr-8 focus:outline-none xl:w-[500px]" />
                    </div>
                </form>
            </div>

            <!-- User Area -->
            <div class="flex items-center gap-3 2xsm:gap-7">
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
                        <button
                            class="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:color-primary lg:text-base">
                            <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                                    fill="" />
                                <path
                                    d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                                    fill="" />
                            </svg>
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
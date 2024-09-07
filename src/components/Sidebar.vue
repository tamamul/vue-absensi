<template>
    <aside
        :class="sidebarToggle ? 'translate-x-0' : '-translate-x-full'"
        class="absolute left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 w-72 shadow-md text-def">
        <!-- ? SIDEBAR HEADER -->
        <div class="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
            <a href="/" class="flex gap-2 items-center font-semibold text-xl">
                <img src="../assets/app-logo.png" alt="Logo" class="w-12" />
                Absensi Qr Code
            </a>

            <button class="block lg:hidden" :class="{'lg:block' : sidebarToggle}" @click="$emit('toggleSidebar')">
                <i class="pi pi-arrow-left text-lg"></i>
            </button>
        </div>

        <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            <!-- Sidebar Menu -->
            <nav class="mt-5 px-4 lg:mt-9 lg:px-6">
                <!-- Menu Group -->
                <div>
                    <h3 class="mb-4 ml-4 text-sm font-medium text-bodydark2">MENU</h3>

                    <ul class="mb-6 flex flex-col gap-1.5">
                        <!-- Menu Item Dashboard -->
                        <li>
                            <a class="sidebar-active group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-200"
                                href="/"
                            >
                                <i class="pi pi-objects-column text-lg"></i>

                                Dashboard
                            </a>
                        </li>
                        <!-- Menu Item Dashboard -->

                        <!-- Menu Item Calendar -->
                        <li>
                            <a class="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-200"
                                href="calendar.html"
                            >
                                <i class="pi pi-calendar text-lg"></i>

                                Calendar
                            </a>
                        </li>
                        <!-- Menu Item Calendar -->

                    </ul>
                </div>

                <div>
                    <h3 class="mb-4 ml-4 text-sm font-medium text-bodydark2">OTHERS</h3>

                    <ul class="mb-6 flex flex-col gap-1.5">
                        <li>
                            <a class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-gray-200"
                                href="chart.html"
                            >
                                <i class=""></i>

                                Chart
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <!-- Sidebar Menu -->

        </div>
    </aside>

</template>

<script>
export default {
    props: [
        'sidebarToggle'
    ],
    emits: ['toggleSidebar'],
    data() {
        return {
            // sidebarToggle: false,
        }
    },
    methods: {
        toggleSidebar() {
            this.$emit('toggleSidebar')
        }
    }
}
</script>

<style>
</style>
<template>
    <aside
        class="absolute left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 w-72 shadow-md text-def">
        <!-- ? SIDEBAR HEADER -->
        <div class="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
            <a href="index.html" class="flex gap-2 items-center font-semibold text-xl">
                <img src="../assets/app-logo.png" alt="Logo" class="w-12" />
                Absensi Qr Code
            </a>

            <button class="block lg:hidden">
                <svg class="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                        fill="" />
                </svg>
            </button>
        </div>

        <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            <!-- Sidebar Menu -->
            <nav class="mt-5 px-4 lg:mt-9 lg:px-6" x-data="{selected: $persist('Dashboard')}">
                <!-- Menu Group -->
                <div>
                    <h3 class="mb-4 ml-4 text-sm font-medium text-bodydark2">MENU</h3>

                    <ul class="mb-6 flex flex-col gap-1.5">
                        <!-- Menu Item Dashboard -->
                        <li>
                            <a class="sidebar-active group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-200"
                                href="/"
                                :class="{ 'bg-graydark dark:bg-meta-4': (selected === 'Dashboard') || (page === 'ecommerce' || page === 'analytics' || page === 'stocks') }"
                            >
                                <i class="pi pi-objects-column text-lg"></i>

                                Dashboard
                            </a>
                        </li>
                        <!-- Menu Item Dashboard -->

                        <!-- Menu Item Calendar -->
                        <li>
                            <a class="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-200"
                                href="calendar.html" @click="selected = (selected === 'Calendar' ? '' : 'Calendar')"
                                :class="{ 'bg-graydark dark:bg-meta-4': (selected === 'Calendar') && (page === 'calendar') }"
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
                                href="chart.html" @click="selected = (selected === 'Chart' ? '' : 'Chart')"
                                :class="{ 'bg-graydark dark:bg-meta-4': (selected === 'Chart') && (page === 'Chart') }"
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
    data() {
        return {
            sidebarToggle: false,
        }
    }
}
</script>

<style>
</style>
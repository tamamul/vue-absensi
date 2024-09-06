<template>
    <aside
        class="w-[250px] absolute left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0">

        <!-- Sidebar Header -->
        <div class="flex p-6 items-center gap-2">
            <img src="../assets/app-logo.png" alt="" class="w-[60px]">
            <h1 class="font-nunito text-xl font-semibold">Celebes</h1>
        </div>

        <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">

            <!-- Sidebar Menu -->
            <nav class="mt-5 px-4 py-4">
                <!-- Menu Group -->
                <div>
                    <h3 class="mb-4 ml-4 font-bold text-lg font-nunito">Menu</h3>

                    <ul class="mb-6 flex flex-col gap-2">
                        <!-- Menu Item -->
                        <li>
                            <RouterLink :to="router" v-slot="{ href, navigate }">
                                <i class="pi pi-home"></i>
                                Dashboard
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="router" v-slot="{ href, navigate }">
                                <i class="pi pi-home"></i>
                                Dashboard
                            </RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Other Group -->
                <div></div>
            </nav>

        </div>
    </aside>
</template>

<script>
export default {
    props: [
        // visible
    ],
    data() {
        return {
            active: true,
            items: [
                {
                    separator: true
                },
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Dashboard',
                            icon: 'pi pi-home',
                            href: '/'
                        }
                    ]
                },
                {
                    label: 'Pegawai',
                    items: [
                        {
                            label: 'List Pegawai',
                            icon: 'pi pi-list',
                            href: '/pegawai/list'
                        },
                        {
                            label: 'Tambah Pegawai',
                            icon: 'pi pi-user-plus',
                            href: '/pegawai/tambah'
                        },
                        {
                            label: 'Gaji Pegawai',
                            icon: 'pi pi-wallet',
                            href: '/pegawai/gaji'
                        },
                    ]
                },
                {
                    label: 'Profile',
                    items: [
                        {
                            label: 'Settings',
                            icon: 'pi pi-cog',
                            href: '/theming/unstyled'
                        }
                    ]
                },
                {
                    separator: true
                }
            ]
            
        };
    }
};
</script>

<style>
</style>

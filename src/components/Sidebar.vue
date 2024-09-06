<template>
    <!-- Sidebar -->

        <!-- Sidebar Menu -->
        <Menu :model="items" class="rounded-none w-[250px] p-3 border-none shadow-md">
            <template #start>
            </template>
            <template #submenulabel="{ item }">
                <span class="text-primary font-bold">{{ item.label }}</span>
            </template>
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate" class="bg-blue-50">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </template>
            <template #end>
                <button v-ripple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
                    <span class="inline-flex flex-col items-start">
                        <span class="font-bold">Amy Elsner</span>
                        <span class="text-sm">Admin</span>
                    </span>
                </button>
            </template>
        </Menu>
    <!-- </div> -->

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
                            route: '/'
                        }
                    ]
                },
                {
                    label: 'Pegawai',
                    items: [
                        {
                            label: 'List Pegawai',
                            icon: 'pi pi-list',
                            route: '/pegawai/list'
                        },
                        {
                            label: 'Tambah Pegawai',
                            icon: 'pi pi-user-plus',
                            route: '/pegawai/tambah'
                        },
                        {
                            label: 'Gaji Pegawai',
                            icon: 'pi pi-wallet',
                            route: '/pegawai/gaji'
                        },
                    ]
                },
                {
                    label: 'Profile',
                    items: [
                        {
                            label: 'Settings',
                            icon: 'pi pi-cog',
                            route: '/theming/unstyled'
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

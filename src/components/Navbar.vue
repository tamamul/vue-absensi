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

                    <button class="flex items-center gap-4" @click="toggleDropdown" aria-haspopup="true" aria-controls="overlay_tmenu">
                        <span class="hidden text-right lg:block">
                            <span class="block text-sm font-medium text-black">{{ username }}</span>
                            <span class="block text-xs font-medium">{{ jabatan }}</span>
                        </span>

                        <span class="h-12 w-12 rounded-full">
                            <img src="../assets/app-logo.png"
                                alt="nama-user"
                                class="rounded-full" />
                        </span>

                        <i :class="{'rotate-180' : dropdownOpen}" class="hidden fill-current sm:block transition-all ease-in-out pi pi-angle-down"></i>
                    </button>

                    <TieredMenu ref="menu" id="overlay_tmenu" :model="userItems" popup >
                        <template #item="{ item, props, hasSubmenu }">
                            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                                    <span :class="item.icon" />
                                    <span class="ml-2">{{ item.label }}</span>
                                </a>
                            </router-link>
                            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                                <span :class="item.icon" />
                                <span class="ml-2">{{ item.label }}</span>
                                <span v-if="hasSubmenu" class="pi pi-angle-right ml-auto" />
                            </a>
                        </template>
                    </TieredMenu>
                </div>
            </div>

        </div>
    </header>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import router from '@/router'
export default {
    emits: ['toggleSidebar'],
    data() {
        return {
            authStore: useAuthStore(),
            username: '',
            jabatan: '',
            pegawai: [],
            dropdownOpen:true,
            token: localStorage.getItem('token'),
            userItems: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    route: '/profile'
                },
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    route: '/settings'
                },
                {
                    separator: true
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.logout()
                        this.$router.push('/login');
                    }
                },
            ],
        }
    },
    methods: {
        async getUser() {
            await this.authStore.getUser()

            this.isAdmin    = this.authStore.authUser.is_admin
            const pegawai = this.authStore.authUser.pegawai
            if (pegawai === null) {
                this.username = 'Admin'
                this.jabatan  = 'HRD'
            }
            this.pegawai = pegawai
            this.username = pegawai.nama_lengkap
            this.jabatan = pegawai.jabatan
            this.isLoading  = false
        },
        toggleDropdown(event) {
            this.$refs.menu.toggle(event);
            this.dropdownOpen = !this.dropdownOpen;
        },
        logout() {
            axios.post('/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${this.token}` 
                }
            }).then((response) => {
                console.log(response);
                localStorage.removeItem('token')
                localStorage.removeItem('is_admin')
                this.$toast.add({
                    severity: 'success',
                    summary: 'Logout Berhasil',
                    detail: 'Sukses melakukan logout',
                    life: 5000
                });
                router.push({name: 'login'})
            }).catch((error) => {
                console.log(error)
                console.log(this.token)
                this.$toast.add({
                    severity: 'error',
                    summary: 'Logout gagal',
                    detail: 'Gagal melakukan logout',
                    life: 5000
                });
            });
        },
    },
    async mounted() {
        await this.getUser()
    },
}
</script>

<style>
    .icon-nav {
        background: none;
    }
</style>
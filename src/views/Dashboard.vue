<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>

    <div v-else class="grid grid-cols-12 gap-5 m-5">
        <!-- Admin -->
        <Card class="col-span-12 lg:col-span-4 shadow-md" v-if="isAdmin">
            <template #title>
                Jumlah Pegawai
            </template>
            <template #content>
                
            </template>
        </Card>
        <!-- Pegawai -->
        <Card class="col-span-12 shadow-md" v-if="!isAdmin">
            <template #title>
                another one
            </template>
            <template #content>
                User normal only      
            </template>
        </Card>
        <!-- Umum -->
        <Card class="col-span-12 shadow-md">
            <template #title>
                Card umum
            </template>
            <template #content>
                Absen Sekarang
            </template>
        </Card>
    </div>

</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
    name: 'Dashboard',
    inject: ['default'],
    data() {
        return {
            authStore: useAuthStore(),
            isAdmin: 0,
            isLoading: true
        }
    },
    methods: {
        async getUser() {
            await this.authStore.getUser()
            this.isAdmin    = this.authStore.authUser.is_admin
            this.isLoading  = false
        }
    },
    async mounted() {
        await this.getUser()
    },
};
</script>

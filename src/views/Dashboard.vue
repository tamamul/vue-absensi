<template>
    <Card class="col-span-12 shadow-md" v-if="isAdmin">
        <template #title>
            text
        </template>
        <template #content>
            admin only
            token
        </template>
    </Card>
    <Card class="col-span-12 shadow-md" v-if="!isAdmin">
        <template #title>
            another one
        </template>
        <template #content>
            User normal only      
        </template>
    </Card>
    <Card class="col-span-12 shadow-md">
        <template #title>
            another one
        </template>
        <template #content>
            both {{ this.default.image }}
        </template>
    </Card>
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
        }
    },
    methods: {
        async getUser() {
            await this.authStore.getUser()
            
            this.isAdmin = this.authStore.authUser.is_admin
        }
    },
    mounted() {
        this.getUser()
    },
};
</script>

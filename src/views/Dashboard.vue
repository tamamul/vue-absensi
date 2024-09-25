<template>
    <div v-if="isLoading" class="grid grid-cols-12 gap-5 m-5">
        <Skeleton class="col-span-12" width="100%" height="5rem"></Skeleton>
    </div>

    <div v-else class="grid grid-cols-12 gap-5 m-5">
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
    mounted() {
        this.getUser()
    },
};
</script>

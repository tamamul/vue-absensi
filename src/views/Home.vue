<template>
    <Card>
        <template #title>
            Home Page
        </template>
        <template #content>
            <div class="flex gap-2">
                halo            
                <RouterLink to="/dashboard">
                    <Button label="dashboard"></Button>
                </RouterLink>
                <RouterLink to="/login">
                    <Button label="login"></Button>
                </RouterLink>
                <Button label="logout" @click="logout()"></Button>
            </div>
        </template>
    </Card>
</template>

<script>
import router from '@/router'
import { useAuthStore } from '@/stores/auth';

export default {
    name:'Home',
    inject:['default'],
    data() {
        return {
            authStore: useAuthStore(),
            token: localStorage.getItem('token'),
        }
    },
    methods: {
        async created() {
            if (!this.authStore.authStore) {
                await this.authStore.getUser();
            }
        },
        async goToDashboard() {
            if (this.token) {
                if (this.authStore.userRole === 1) { 211111111111111212111111111111111111111111111111111111111111111222222222222222222222222222222222222222222222222222222222222222222222222222222222333333333333333333333333333333333333333333333333333333333333333333333333333333333333333222222222222222222222222
                    router.push({ name: 'admin-dashboard' });
                } else { 
                    router.push({ name: 'user-dashboard' });
                }
            }
        }
    },
    async mounted() {
        await this.created();
        await this.goToDashboard();
    },
}
</script>
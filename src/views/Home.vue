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

export default {
    name:'Home',
    inject:['default'],
    data() {
        return {
        }
    },
    methods: {
        logout() {
            axios.post('/logout', {}, {
                headers: {'Authorization': `Bearer ${this.token}`}
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
    mounted() {
    },
}
</script>
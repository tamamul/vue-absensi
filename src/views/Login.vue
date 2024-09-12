<template>
    <div class="h-dvh flex justify-center items-center bg-[#F1F5F9]">
        <Card class="flex flex-col gap-4 ">
            <template #title>Login</template>
            <template #content>
                <form @submit.prevent="onSubmit()">
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-user"></i>
                        </InputGroupAddon>
                        <InputText v-model="form.email" placeholder="Username" required />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-lock"></i>
                        </InputGroupAddon>
                        <Password v-model="form.password" placeholder="Password" toggleMask :feedback="false" required />
                    </InputGroup>
                </form>
            </template>
        </Card>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            loading: false,
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        onSubmit() {
            this.loading = true;
            this.login(this.form).then((res) => {
                if (res) {
                    this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Login success', life: 3000 });
                    this.$router.push({ name: 'dashboard' });
                }
            }).catch((err) => {
                try {
                    const errorMessage = err.response.data.message.replace('\\n', '\n');
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
                } catch (error) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Login failed', life: 3000 });
                }
            }).finally(() => {
                this.loading = false;
            })
        }
    },
    inject: ['default']
}
</script>

<style>

</style>
<template>
    <div class="w-full h-dvh flex justify-center items-center bg-[#F1F5F9]">
        <Card class="shadow-md w-96 h-80 flex flex-col justify-center">
            <template #title>
                <div class="flex flex-col gap-2">
                    <h1 class="text-3xl">Login</h1>
                    <p class="font-normal text-sm">Masuk kedalam aplikasi absensi</p>
                </div>
            </template>
            <template #content>
                <form id="login" @submit.prevent="login" class="flex flex-col gap-2">
                    <!-- Input for Email -->
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-user"></i>
                        </InputGroupAddon>
                        <InputText 
                            v-model="email" 
                            placeholder="Email" 
                            required
                            autofocus
                        />
                    </InputGroup>
                    <small class="text-red-500" v-if="hasValidated && v$.email.$error">
                        {{ v$.email.email ? 'Invalid email format' : 'Email is required' }}
                    </small>
                    <small v-else class="invisible">...</small>

                    <!-- Input for Password -->
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-lock"></i>
                        </InputGroupAddon>
                        <Password 
                            class="border border-[#CBD5E1]" 
                            v-model="password" 
                            toggleMask 
                            placeholder="Password" 
                            :feedback="false" 
                            required 
                        />
                    </InputGroup>
                    <small class="text-red-500" v-if="hasValidated && v$.password.$error">
                        Password is required
                    </small>
                    <small v-else class="invisible">...</small>

                    <!-- Submit Button -->
                    <Button label="Login" :loading="btnIsLoading" type="submit" />
                </form>
            </template>
        </Card>
    </div>
</template>



<script>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

export default {
    data() {
        return {
            // Store
            authStore: useAuthStore(),
            // Validation
            v$          : useVuelidate(),
            hasValidated: false,
            // Form
            email       : '',
            password    : '',
            btnIsLoading: false,
        };
    },

    validation() {
        return {
            email   : { required, email },
            password: { required },
        }
    },

    methods: {
        // Login method
        async login() {
            this.v$.$validate();
            this.btnIsLoading = true;
            const data = { email: this.email, password: this.password };
            await this.authStore.login(data)

            // this.authStore.userRole == 1 ? router.push({ name: 'admin-dashboard' }) : router.push({ name: 'user-dashboard' })
            this.btnIsLoading = false;
        },

        // alreadyLogin() {
        //     localStorage.removeItem('token')
        //     if (localStorage.getItem('token') != null) {J
        //         router.push({name: 'dashboard'})
        //     }
        // }
    },

    mounted() {
        // this.alreadyLogin();
    },
}

</script>

<style scoped>
	.borderDanger {
		@apply border-red-500
	}
	.p-password-input.p-inputtext{
		border: none;
	}
</style>
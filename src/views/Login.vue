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
				<form @submit.prevent="login" class="flex flex-col gap-2" v-focustrap>
					<!-- Input for Email -->
					<InputGroup>
						<InputGroupAddon>
							<i class="pi pi-user"></i>
						</InputGroupAddon>
						<InputText 
							:class="{borderDanger : emailErr}" 
							v-model="email" 
							placeholder="Email" 
							autofocus 
							required 
						/>
					</InputGroup>
					<small class="text-red-500" v-show="emailErr" id="email-help">{{ emailErrMsg }}</small>

					<!-- Input for Password -->
					<InputGroup>
						<InputGroupAddon>
							<i class="pi pi-lock"></i>
						</InputGroupAddon>
						<Password 
							class="border border-[#CBD5E1]" 
							:class="{borderDanger : passwordErr}" 
							v-model="password" 
							toggleMask 
							placeholder="Password" 
							:feedback="false" 
							required 
						/>
					</InputGroup>
					<small class="text-red-500" v-show="passwordErr" id="password-help">{{ passwordErrMsg }}</small>

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
            // State
            email: '',
            emailErr: false,
            emailErrMsg: '',
            password: '',
            passwordErr: false,
            passwordErrMsg: '',
            btnIsLoading: false,
        };
    },
    methods: {
        // Login method
        async login() {
            const authStore = useAuthStore();  // Get auth store
            this.btnIsLoading = true;  // Set loading state

            try {
                // Validate input (basic check)
                if (!this.email) {
                    this.emailErr = true;
                    this.emailErrMsg = "Email is required.";
                    this.btnIsLoading = false;
                    return;
                }
                if (!this.password) {
                    this.passwordErr = true;
                    this.passwordErrMsg = "Password is required.";
                    this.btnIsLoading = false;
                    return;
                }

                // Call login action from store
                await authStore.login({ email: this.email, password: this.password });

                // If successful, redirect to dashboard
                router.push({ name: 'dashboard' });
            } catch (error) {
                // Handle login failure (set error messages)
                if (error.response?.data?.message) {
                    const errorMsg = error.response.data.message;

                    if (errorMsg.includes('email')) {
                        this.emailErr = true;
                        this.emailErrMsg = errorMsg;
                    }

                    if (errorMsg.includes('password')) {
                        this.passwordErr = true;
                        this.passwordErrMsg = errorMsg;
                    }
                } else {
                    console.error('Login error:', error);
                }
            } finally {
                this.btnIsLoading = false;  // Turn off loading state
            }
        },

        // Check if already logged in
        // alreadyLogin() {
        //     const token = localStorage.getItem('token');
        //     if (token) {
        //         router.push({ name: 'dashboard' });
        //     }
        // },
    },
    mounted() {
        // this.alreadyLogin();  // Check if user is already logged in
    },
};

</script>

<style scoped>
	.borderDanger {
		@apply border-red-500
	}
	.p-password-input.p-inputtext{
		border: none;
	}
</style>
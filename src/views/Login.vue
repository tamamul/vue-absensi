<template>
	<div class="w-full h-dvh flex justify-center items-center bg-[#F1F5F9]">
		<Card class="shadow-md">
			<template #title>
				<div class="flex flex-col gap-2">
					<h1 class="text-3xl">Login</h1>
					<p class="font-normal text-sm">Masuk kedalam aplikasi absensi</p>
				</div>
			</template>
			<template #content>
				<form @submit="prevent" class="flex flex-col gap-2">
					<!-- Input -->
					<InputGroup>
						<InputGroupAddon>
							<i class="pi pi-user"></i>
						</InputGroupAddon>
						<InputText :class="{borderDanger : emailErr}" v-model="email" placeholder="Email" required />
					</InputGroup>
					<small class="text-red-500" v-show="emailErr" id="email-help">{{ emailErrMsg }}</small>
					
					<InputGroup>
						<InputGroupAddon>
							<i class="pi pi-lock"></i>
						</InputGroupAddon>
						<Password class="border border-[#CBD5E1]" :class="{borderDanger : passwordErr}" v-model="password" toggleMask placeholder="Password" :feedback="false" required />
					</InputGroup>
					<small class="text-red-500" v-show="passwordErr" id="password-help">{{ passwordErrMsg }}</small>
					
					<!-- Submit -->
					<Button label="Login" @click="handleLogin" />
				</form>
			</template>
		</Card>
	</div>
</template>

<script>
import router from '@/router'
import { useAuthStore } from '@/stores/auth';
export default {
    data() {
        return {
			// Stete
			store: useAuthStore,
			// Email
			email		: '',
			emailErr	: false,
			emailErrMsg	: '',
			// Password
			password		: '',
			passwordErr		: false,
			passwordErrMsg	: '',
        }
    },
	methods: {
		// Login
		handleLogin() {
			const authStore = useAuthStore(); // Initialize the store

			authStore.login(
				this.email,
				this.emailErr,
				this.emailErrMsg,
				this.password,
				this.passwordErr,
				this.passwordErrMsg
			)
		},

		// Check already login
        alreadyLogin() {
            this.token = localStorage.getItem('token');
            if (this.token) {
                router.push({name: 'dashboard'});
            }
        },
	},
	mounted() {
		this.alreadyLogin();
	},
}
</script>
<style>
	.borderDanger {
		@apply border-red-500
	}
	.p-password-input.p-inputtext{
		border: none;
	}
</style>
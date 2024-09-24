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
					<Button label="Login" @click="login" />
				</form>
			</template>
		</Card>
	</div>
</template>

<script>
import router from '@/router'
export default {
    data() {
        return {
			email	: '',
			emailErr: false,
			emailErrMsg: '',
			password: '',
			passwordErr: false,
			passwordErrMsg: '',
        }
    },
	methods: {
		// admin@gmail.com
		// 12345678
		// Login
		login() {
			if (this.email && this.password) {
				axios.post('/login', {
					email	: this.email,
					password: this.password
				}).then((response) => {
					// console.log(response);
					localStorage.setItem('token', response.data.token)
					localStorage.setItem('is_admin', response.data.is_admin)
					router.push({name: 'dashboard'})
				}).catch((error) => {
					// console.log(error);
					if (error.response.status == 401) {
						this.emailErr = false;
						this.passwordErr = true;
						this.passwordErrMsg = error.response.data.message
						this.$toast.add({
							severity: 'error',
							summary: 'Password anda salah',
							detail: error.response.data.message,
							life: 5000
						});
					}
					if (error.response) {
						const errors = error.response.data.errors
						if (errors.email && errors.password) {
							this.emailErr = true;
							this.emailErrMsg = errors.email.join('');
							this.passwordErr = true;
							this.passwordErrMsg = errors.password.join('');
						} else if (errors.password) {
							this.emailErr = false;
							this.passwordErr = true;
							this.passwordErrMsg = errors.password.join('');
						} else if (errors.email) {
							this.passwordErr = false;
							this.emailErr = true;
							this.emailErrMsg = errors.email.join('');
						}
						// console.log(errors.email)
						// console.log(errors.password)
					}
					this.$toast.add({
						severity: 'error',
						summary: 'Email atau password anda salah',
						detail: 'Masukkan email dan password yang benar!',
						life: 5000
					});
				});
			} else {
				this.$toast.add({
					severity: 'error',
					summary: 'Masukkan Email dan Password',
					detail: 'Email dan password wajib diisi!',
					life: 5000
				});
			}
		},

		// Check already login
        ifLogin() {
            this.token = localStorage.getItem('token');
            if (this.token) {
                router.push({name: 'dashboard'});
            }
        },
	},
	mounted() {
		this.ifLogin();
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
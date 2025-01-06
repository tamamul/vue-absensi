<template>
	<div class="flex w-full h-dvh items-center justify-center">
		<Card class="col-span-12 shadow-md">
			<template #title>
				Masukkan Password Baru
			</template>
			<template #content>
				<div class="flex flex-col gap-2">
					<div class="flex justify-center">
						<RouterLink :to="dashboard" v-show="token">
							<Button label="Kembali ke Dashboard"></Button>
						</RouterLink>
					</div>
				</div>
				<!-- Input -->
				<form @submit="prevent" class="flex flex-col gap-2">					
					<!-- <InputGroup>
						<InputGroupAddon>
							<i class="pi pi-lock"></i>
						</InputGroupAddon>
						<Password class="border border-[#CBD5E1]" v-model="password" toggleMask placeholder="Password" :feedback="false" required />
					</InputGroup> -->
					<FloatLabel variant="in" class="w-full">
						<Password class="w-full" v-model="password" toggleMask :feedback="false" inputId="pass" variant="filled" :invalid="passValid" required />
						<label for="pass" class="w-full">Password</label>
					</FloatLabel>

					<FloatLabel variant="in" class="w-full">
						<Password class="w-full" v-model="password_confirm" toggleMask :feedback="false" inputId="passcon" variant="filled" :invalid="passValid" required />
						<label for="passcon" class="w-full">Ulang Password</label>
					</FloatLabel>
					<!-- <InputGroup>
						<InputGroupAddon>
							<i class="pi pi-lock"></i>
						</InputGroupAddon>
						<Password class="border border-[#CBD5E1]" v-model="password_confirm" toggleMask placeholder="Konfirmasi Password" :feedback="false" required />
					</InputGroup> -->

					<Button label="Kirim" @click="kirim" />
				</form>
			</template>
		</Card>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
	name:'ResetPassword',
	inject:['default'],
	// setup () {
	// 	return { v$: useVuelidate() }
	// },
	data() {
		return {
			password: '',
			password_confirm: '',
			dashboard: '',
			passValid: false,
			authStore: useAuthStore(),
            dataUser : 0,
            dataRole : 0,
		}
	},
	// validations() {
	// 	return {
	// 		firstName: { required },
	// 		lastName: { required },
	// 		contact: {
	// 			email: { required, email }
	// 		}
	// 	}
	// },
	methods: {
		getToken () {
			localStorage.setItem('token', this.$route.query.token)
		},
		async kirim() {
			if (this.password !== this.password_confirm) {
				this.$toast.add({
					severity: 'error',
					summary: 'Password Gagal Diganti',
					detail: 'Password dan konfirmasi password tidak cocok.',
					life: 5000,
				});
				return; // Keluar dari fungsi jika password tidak cocok
			}

			const data = {
				email: this.$route.query.email,
				password: this.password,
				password_confirmation: this.password_confirm,
			};

			try {
				// Kirim permintaan reset password
				await axios.post(`/password-reset?token=${this.$route.query.token}&email=${this.$route.query.email}`, data);

				this.$toast.add({
					severity: 'success',
					summary: 'Password Berhasil Diganti',
					detail: 'Masuk dengan password baru.',
					life: 5000,
				});

				// Login otomatis setelah reset password berhasil
				await this.authStore.login({
					email: this.$route.query.email,
					password: this.password,
				});

			} catch (err) {
				console.error(err);
				this.$toast.add({
					severity: 'error',
					summary: 'Password Gagal Diganti',
					detail: 'Silakan coba lagi.',
					life: 5000,
				});
			}
		},

		async getUser() {
			await this.authStore.getUser();
				this.dataUser = this.authStore.authUser;
				this.dataRole = this.authStore.userRole;

				if (this.dataRole == 'admin') {
					this.dashboard = 'AdminDashboard';
				} else {
					this.dashboard = 'UserDashboard';
				}
		},
	},
	async mounted() {
		await this.getUser();
		this.getToken();
		this.isLoading = false;
	}
}
</script>
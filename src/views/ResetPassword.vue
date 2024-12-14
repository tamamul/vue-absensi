<template>
	<div class="flex w-full h-dvh items-center justify-center">
		<Card class="col-span-12 shadow-md">
			<template #title>
				Reset Password
			</template>
			<template #content>
				<div class="flex flex-col gap-2">
					<div class="flex justify-center">
						<RouterLink :to="dashboard" v-show="token">
							<Button label="Kembali ke Dashboard"></Button>
						</RouterLink>
						<RouterLink to="login" v-show="!token">
							<Button label="Login"></Button>
						</RouterLink>
					</div>
				</div>
				<!-- Input -->
				<form @submit="prevent" class="flex flex-col gap-2">					
					<InputGroup>
						<InputGroupAddon>
							<i class="pi pi-lock"></i>
						</InputGroupAddon>
						<Password class="border border-[#CBD5E1]" v-model="password" toggleMask placeholder="Password" :feedback="false" required />
					</InputGroup>

					<InputGroup>
						<InputGroupAddon>
							<i class="pi pi-lock"></i>
						</InputGroupAddon>
						<Password class="border border-[#CBD5E1]" v-model="password_confirm" toggleMask placeholder="Konfirmasi Password" :feedback="false" required />
					</InputGroup>

					<Button label="Kirim" @click="kirim" />
				</form>
			</template>
		</Card>
	</div>
</template>

<script>
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
			const data = {
				email: (this.$route.query.email),
				password: this.password,
				password_confirmation: this.password_confirm,
			}
			await axios.post(`/password-reset?token=${this.$route.query.token}&email=${this.$route.query.email}`, data).then((res) => {
				// console.log(res)
                this.$toast.add({ severity: 'success', summary: 'Password Berhasil diganti', detail: `Masuk dengan password baru `, life: 5000 });
				router.push({name: this.dashboard})
			}).catch((err) => {
				console.log(err)
                this.$toast.add({ severity: 'error', summary: 'Password Gagal diganti', detail: `Login dengan password lama `, life: 5000 });
			})
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
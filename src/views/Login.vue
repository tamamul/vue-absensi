<template>
    <div class="w-full h-dvh flex justify-center items-center">
        <Card class="shadow-md">
            <template #title>
                <div class="flex flex-col gap-2">
                    <h1 class="text-3xl">Login</h1>
                    <p class="font-normal text-sm">Masuk kedalam aplikasi absensi</p>
                </div>
            </template>
            <template #content>
                <form @submit="prevent" class="flex flex-col gap-2">
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-user"></i>
                        </InputGroupAddon>
                        <InputText v-model="email" placeholder="Email" required />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-lock"></i>
                        </InputGroupAddon>
                        <Password v-model="password" toggleMask placeholder="Password" :feedback="false" required />
                    </InputGroup>
                    <Button label="Login" @click="login" />
                </form>
            </template>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
			email	: '',
			password: '',
        }
    },
	methods: {
		// admin@gmail.com
		// 12345678
		login() {
			if (this.email && this.password) {
				axios.post('/login', {
					email	: this.email,
					password: this.password
				}).then((response) => {
					console.log(response);
					localStorage.setItem('email', response.data.data.email)
					localStorage.setItem('id_user', response.data.data.id_user)
					localStorage.setItem('avatar', response.data.data.avatar)
					localStorage.setItem('token', response.data.token)
				}).catch((error) => {
					console.log(error);
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
		}
	}
}
</script>

<style>

</style>
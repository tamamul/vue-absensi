<template>
	<div class="flex w-full h-dvh items-center justify-center">
		<Card class="col-span-12 shadow-md">
			<template #title>
				Reset Password
			</template>
			<template #content>
				<!-- <div class="flex flex-col gap-2">
					<div class="flex justify-center">
						<RouterLink to="dashboard" v-show="token">
							<Button label="Kembali ke Dashboard"></Button>
						</RouterLink>
						<RouterLink to="login" v-show="!token">
							<Button label="Login"></Button>
						</RouterLink>
					</div>
				</div> -->
				<!-- Input -->
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
						<Password class="border border-[#CBD5E1]" v-model="password" toggleMask placeholder="Password" :feedback="false" required />
					</InputGroup>

					<InputGroup>
						<InputGroupAddon>
							<i class="pi pi-lock"></i>
						</InputGroupAddon>
						<Password class="border border-[#CBD5E1]" v-model="password_confirmation" toggleMask placeholder="Konfirmasi Password" :feedback="false" required />
					</InputGroup>

					<Button label="Kirim" @click="kirim" />
				</form>
			</template>
		</Card>
	</div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
	name:'NotFound',
	inject:['default'],
	setup () {
		return { v$: useVuelidate() }
	},
	data() {
		return {
			email: '',
			password: '',
			password_confirmation: '',
		}
	},
	validations() {
		return {
			firstName: { required },
			lastName: { required },
			contact: {
				email: { required, email }
			}
		}
	},
	methods: {
		async kirim() {
			await axios.post('')
		}
	},
	mounted() {
	},
}
</script>
<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>

	<div class="grid grid-cols-12 m-5" v-else>
		<Card class="col-span-12 shadow-md">
			<template #title>
				Profile
			</template>
			<template #content>
				<div class="grid grid-cols-12">
					<div class="col-span-4">
						<Image :src="avatar" :alt="user.nama_lengkap" />
						<p class="text-2xl font-semibold">{{ user.nama_lengkap ?? 'Admin' }}</p>
						<p class="text-lg">{{ user.jabatan ?? 'HRD' }}</p>
					</div>
					<div class="col-span-8 flex flex-col gap-4">
						<div class="grid grid-cols-12 items-center">
							<div class="col-span-2">Username</div>
							<div class="col-span-10">
								<InputText class="w-full"></InputText>
							</div>
						</div>
						<div class="grid grid-cols-12 items-center">
							<div class="col-span-2">Username</div>
							<div class="col-span-10">
								<InputText class="w-full"></InputText>
							</div>
						</div>
					</div>
				</div>
			</template>
		</Card>
	</div>
</template>

<script>
export default {
	name:'Profile',
	inject:['default'],
	data() {
		return {
			isLoading: true,
			user: [],
			avatar: '',

		}
	},
	methods: {
		async getUser() {
			await axios.get('user', {
				headers: {'Authorization': `Bearer ${localStorage.getItem('token')}` }
			}).then((res) => {
				const mainData = res.data.data
				this.user = (mainData)
				// Avatar If null
				mainData.avatar == null ? this.avatar = '/src/assets/app-logo.png' : this.avatar = (mainData.avatar)
				console.log(mainData)
				this.isLoading = false
			}).catch((err) => {
				console.log(err)
			})
		}
	},
	async mounted() {
		await this.getUser()
	},
}
</script>
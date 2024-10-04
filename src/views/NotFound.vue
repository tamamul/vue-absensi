<template>
	<div class="flex w-full h-dvh items-center justify-center">
		<Card class="col-span-12 shadow-md">
			<template #title>
				<h1 class="text-3xl">
					Error 404 - Page Not Found :(
				</h1>
			</template>
			<template #content>
				<div class="flex flex-col gap-2">
					<p>Halaman yang kamu cari tidak ditemukan <br>atau telah di pindah kan ke route lain</p>
					<div class="flex justify-center">
						<RouterLink to="/dashboard" v-show="token">
							<Button label="Kembali ke Dashboard"></Button>
						</RouterLink>
						<RouterLink to="/login" v-show="!token">
							<Button label="Login"></Button>
						</RouterLink>
					</div>
				</div>
			</template>
		</Card>
	</div>
</template>

<script>
export default {
	name:'NotFound',
	inject:['default'],
	data() {
		return {
			token: localStorage.getItem('token')
		}
	},
	methods: {
	},
	mounted() {
	},
}
</script>
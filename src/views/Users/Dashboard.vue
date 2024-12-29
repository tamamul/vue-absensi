<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
		<div class="col-span-12 w-full flex justify-center items-center">
			<ProgressSpinner />
		</div>
	</div>

	<div v-else class="grid grid-cols-12 gap-5 m-5">
        <PageHeader title="Absensi" />

		<!-- Umum -->
		<Card class="col-span-12 shadow-md">
			<template #title>
				Users Only
			</template>
			<template #content>
				Absen Sekarang
			</template>
		</Card>
	</div>

</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
	name: 'Dashboard',
	inject: ['default'],
	data() {
		return {
			authStore: useAuthStore(),
			isLoading: true
		}
	},
	methods: {
		async getUser() {
			await this.authStore.getUser()
			this.isLoading = false
		}
	},
	async mounted() {
		await this.getUser()
	},
};
</script>

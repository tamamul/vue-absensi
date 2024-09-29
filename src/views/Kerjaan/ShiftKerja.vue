<template>
	<div class="grid grid-cols-12 m-5 gap-5" v-if="isLoading">
		<Skeleton height="50vh" width="100%" class="col-span-12"></Skeleton>
	</div>
	<div class="grid grid-cols-12 m-5 gap-5" v-else>
		<Card class="col-span-12 shadow-md">
			<template #title>
				Data Shift Kerja Pegawai
			</template>
			<template #content>
				<DataTable :value="dataShift"></DataTable>
			</template>
		</Card>
	</div>
</template>

<script>
export default {
	name:'ShiftKerja',
	inject:['default'],
	data() {
		return {
			isLoading: false,
			dataShift: []
		}
	},
	methods: {
		async getShift() {
			await axios.get('shift', {
				headers: {
					'Authorization': `Bearer ${this.default.token}`
				}
			}).then((res) => {
				console.log(res)
			}).catch((err) => {
				console.log(err)
				// if (err.status == 401) {
				// 	router.push({name: 'login'})
				// }
			})
		}
	},
	mounted() {
		this.getShift()
	},
}
</script>
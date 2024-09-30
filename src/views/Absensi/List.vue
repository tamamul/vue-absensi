<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>

	<div class="grid grid-cols-12 gap-5 m-5" v-else>
		<Card class="col-span-12 shadow-md">
			<template #title>
				Konfirmasi Absensi
			</template>
			<template #content>
				<div class="flex flex-col">
					<InputText type="text" v-model="kodeAbsensi"  />
					<Button label="testing" @click="postKodeAbsensi"></Button>
				</div>
			</template>
		</Card>

		<Card class="col-span-12 shadow-md">
			<template #title>
				Daftar Pegawai Telah Absen
			</template>
			<template #content>
				<DataTable :value="telahAbsen" tableStyle="min-width: 50rem">
					<Column v-for="col of telahAbsen" :key="col.field" :field="col.field" :header="col.header"></Column>
				</DataTable>
			</template>
		</Card>
	</div>
</template>

<script>
export default {
	name:'Konfirmasi',
	inject:['default'],
	data() {
		return {
			isLoading: false,
			kodeAbsensi: '',
			telahAbsen: []
		}
	},
	methods: {
		async postKodeAbsensi () {
			const data = {token: this.kodeAbsensi}
			await axios.post('kehadiran/confirm', data, {
				headers: {
                    'Authorization': `Bearer ${this.default.token}`
                }
			}).then((res) => {
				console.log(res)
			}).catch((err) => {
				console.log(err)
			})
		},
		async getKodeAbsensi() {
			await axios.get('kehadiran', {
				headers: {
					'Authorization': `Bearer ${this.default.token}`
				}
			}).then((res) => {
				this.telahAbsen = (res.data.data)
				console.log(res)
			}).catch((err) => {
				console.log(err)
			})
		}
	},
	mounted() {
		this.getKodeAbsensi()
	},
}
</script>
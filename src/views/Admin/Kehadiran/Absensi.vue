<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>

	<div class="grid grid-cols-12 gap-5 m-5 mb-24 lg:mb-5" v-else>
		<Card class="col-span-12 shadow-md">
			<template #title>
				Konfirmasi Absensi
			</template>
			<template #content>
				<div class="flex flex-col">
					<InputText type="text" v-model="kodeAbsensi"  @keydown.enter="postKodeAbsensi" :loading="inputIsLoading" />
				</div>
			</template>
		</Card>

		<Card class="col-span-12 shadow-md">
			<template #title>
				Daftar Pegawai Telah Absen
			</template>
			<template #content>
				<TableDefault :columns="columns" api="/kehadiran" id="id_kehadiran">
					<Column header="Waktu Kehadiran" field="hari">
						<template #body="slotProps">
							{{ slotProps.data.hari + ', ' + slotProps.data.tgl_kehadiran }}
						</template>
					</Column>
				</TableDefault>
			</template>
		</Card>
	</div>
</template>

<script>
import router from '@/router';

export default {
	name:'Konfirmasi',
	inject:['default'],
	data() {
		return {
			isLoading: false,
			inputIsLoading: false,
			kodeAbsensi: '',
			telahAbsen: [],
			cusColumn: 'hari + ,  + tgl_kehadiran',
			columns: [
				{'field': 'nama_pegawai', 'header': 'Nama Pegawai'},
				{'field': 'status', 'header': 'Status'},
				{'field': 'jam_masuk', 'header': 'Jam Masuk'},
				{'field': 'jam_keluar', 'header': 'Jam Keluar'},
				// {'field': 'tgl_kehadiran', 'header': 'Tanggal Kehadiran'},
				// {'field': 'hari', 'header': 'Hari'},
			]
		}
	},
	methods: {
		async postKodeAbsensi () {
			this.inputIsLoading = true
			const data = {token: this.kodeAbsensi}
			await axios.post('kehadiran/confirm', data).then((res) => {
				this.inputIsLoading = false
				console.log(res)
				this.kodeAbsensi = ''
			}).catch((err) => {
				this.inputIsLoading = false
				console.log('Err Bro' + err)
				this.kodeAbsensi = ''
			})
		},
		// async getKodeAbsensi() {
		// 	await axios.get('kehadiran', {
		// 		headers: {
		// 			'Authorization': `Bearer ${this.default.token}`
		// 		}
		// 	}).then((res) => {
		// 		this.telahAbsen = (res.data.data)
		// 		console.log(res)
		// 	}).catch((err) => {
		// 		console.log(err)
		// 		// router.push({name: 'not-found'})
		// 	})
		// }
	},
}
</script>
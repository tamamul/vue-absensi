<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>

	<div class="grid grid-cols-12 gap-5 m-5 mb-24 lg:mb-5" v-else>
		<Card class="col-span-12 shadow-md">
			<template #title>
				<div class="w-full text-center">
					{{ pesan ? 'Konfirmasi Absen Masuk' : 'Konfirmasi Absen Keluar' }}
				</div>
			</template>
			<template #content>
				<Tabs value="0">
					<TabList>
						<Tab value="0" @click="togglePesan()">Absen Masuk</Tab>
						<Tab value="1" @click="togglePesan()">Absen Keluar</Tab>
					</TabList>
					<TabPanels>
						<TabPanel value="0">
							<div class="flex flex-col">
								<InputText type="text" v-model="kodeAbsensi" @keydown.enter="postKodeAbsensi" autofocus  />
							</div>
						</TabPanel>
						<TabPanel value="1">
							<div class="flex flex-col">
								<InputText type="text" v-model="kodeAbsensi" @keydown.enter="postKodeAbsensiKeluar" autofocus  />
							</div>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</template>
		</Card>

		<Card class="col-span-12 shadow-md">
			<template #title>
				Daftar Pegawai Telah Absen
				<div class="mt-4">
					<DatePicker v-model="date" view="month" dateFormat="mm/yy" placeholder="Pilih tahun dan bulan" />
				</div>
				<div class="flex mt-4 overflow-x-auto whitespace-nowrap gap-2">
					{{ tanggal }}
				</div>
			</template>
			<template #content>
				<TableDefault :columns="columns" api="/kehadiran" id="id_kehadiran" :dataLuar="data">
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
import { ColumnGroup } from 'primevue';

export default {
	name:'Absensi',
	inject:['default'],
	data() {
		return {
			isLoading: false,
			inputIsLoading: false,
			kodeAbsensi: '',
			pesan: true,
			data: [],
			date: null,
			tanggal: '',
			columns: [
				{'field': 'nama_pegawai', 'header': 'Nama Pegawai'},
				{'field': 'status', 'header': 'Status'},
				{'field': 'jam_masuk', 'header': 'Jam Masuk'},
				{'field': 'jam_keluar', 'header': 'Jam Keluar'},
			]
		}
	},
	methods: {
		async created() {
			try {
                this.data = await getData("/kehadiran");
                this.isLoading = false;
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
		},
		togglePesan() {
			this.pesan = !this.pesan
		},
		async postKodeAbsensi () {
			console.log(this.kodeAbsensi)
			const data = {token: this.kodeAbsensi}
			await axios.post('kehadiran/confirm', data).then((res) => {
				console.log(res)
				this.kodeAbsensi = ''
				this.$toast.add({
					severity: "success",
					summary: "Success",
					detail: res.data.message,
					life: 3000,
				});
			}).catch((err) => {
				console.log(err)
				this.$toast.add({
					severity: "error",
					summary: "Success",
					detail: err.data.message,
					life: 3000,
				});
				this.kodeAbsensi = ''
			})
		},
		async postKodeAbsensiKeluar () {
			console.log(this.kodeAbsensi)
			const data = {token: this.kodeAbsensi}
			await axios.post('kehadiran/confirm', data).then((res) => {
				console.log(res)
				this.kodeAbsensi = ''
				this.$toast.add({
					severity: "success",
					summary: "Success",
					detail: res.data.message,
					life: 3000,
				});
			}).catch((err) => {
				console.log(err)
				this.$toast.add({
					severity: "error",
					summary: "Success",
					detail: err.data.message,
					life: 3000,
				});
				this.kodeAbsensi = ''
			})
		},
	},
	mounted() {
		this.created()
	}
}
</script>
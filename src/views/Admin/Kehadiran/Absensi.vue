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
					Konfirmasi Absensi Pegawai
				</div>
			</template>
			<template #content>
				<Tabs value="0">
					<TabList>
						<Tab value="0">Absen Masuk</Tab>
						<Tab value="1">Absen Keluar</Tab>
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
				<div class="mt-4 flex gap-3 items-center">
					<label for="date" class="font-semibold">Data Absen Tanggal :</label>
					<DatePicker v-model="date" name="date" id="date" view="date" dateFormat="dd/mm/yy" placeholder="Pilih tanggal" />
					<Button type="button" label="Filter" severity="primary" @click="getDataKehadiran(date)"></Button>
				</div>
				<div class="flex mt-4 overflow-x-auto whitespace-nowrap gap-2">
					<Button
						v-for="item in daftarHari"
						:key="item.tanggal" type="button"
						:label="tahun + `/` + bulan + `/` + item.tanggal + ` ` + item.hari"
						severity="primary"
						@click="toggleOutline"
						class="flex-shrink-0"
						:outlined="outline"
					/>
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
export default {
	name:'Absensi',
	inject:['default'],
	data() {
		return {
			isLoading: false,
			inputIsLoading: false,
			kodeAbsensi: '',
			data: [],
			daftarHari: [],
			tahun: '',
			bulan: '',
			date: new Date(),
			outline: false,
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
		justMonth,
		justYear,
		getTanggalDanHari,
		async created() {
			try {
                this.data = await getData("/kehadiran");
                this.isLoading = false;
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
		},
		toggleOutline() {
			this.outline = !this.outline
		},
		getDataKehadiran(date) {
			this.bulan = (this.justMonth(date))
			this.tahun = (this.justYear(date))
			this.daftarHari = this.getTanggalDanHari(this.bulan, this.tahun)
		},
		async postKodeAbsensi () {
			console.log(this.kodeAbsensi)
			const data = {token: this.kodeAbsensi}
			await axios.post('kehadiran/masuk/confirm', data).then((res) => {
				console.log(res)
				this.created()
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
					summary: "Error",
					detail: `${err.request.response.message}`,
					life: 3000,
				});
				this.kodeAbsensi = ''
			})
		},
		async postKodeAbsensiKeluar () {
			console.log(this.kodeAbsensi)
			const data = {token: this.kodeAbsensi}
			await axios.post('kehadiran/keluar/confirm', data).then((res) => {
				console.log(res)
				this.kodeAbsensi = ''
				this.created()
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
					summary: "Error",
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
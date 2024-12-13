<template>
	<TabPanel value="1">
		<Button icon="pi pi-plus-circle" label="Tambah" @click="toggleJadwalKerja()"></Button>
	</TabPanel>
	<DialogJadwalKerja :visible="visibleJadwalKerja" @toggle="toggleJadwalKerja" :is_default="true" />
</template>

<script>
export default {
	name:'JadwalKerjaUmum',
	data() {
		return {
			jadwalKerja: '',
			columns: [
				{ field: 'nama_jadwal', header: 'Nama Jadwal' },
				{ field: 'jadwal.hari', header: 'Hari' },
			],
			visibleJadwalKerja	: false,
		}
	},
	methods: {
		toggleJadwalKerja() {
			this.visibleJadwalKerja = !this.visibleJadwalKerja;
		},
	},
	mounted() {
	},
}
</script>
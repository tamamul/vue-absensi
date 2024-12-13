<template>
	<Card class="col-span-12 shadow-md">
		<template #title>
			<div class="flex justify-between">
				<h3>
					Daftar Jadwal Kerja
				</h3>
				<Button icon="pi pi-plus-circle" label="Tambah" @click="toggleJadwalKerja()"></Button>
			</div>
			</template>
		<template #content>
			<TableDefault :columns="columns" api="/jadwal" id="id_jadwal" />
		</template>
	</Card>

	<DialogJadwalKerja :visible="visibleJadwalKerja" @toggle="toggleJadwalKerja" />
</template>

<script>
export default {
	name:'CardJadwalKerja',
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
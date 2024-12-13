<template>
	<Card class="col-span-12 xl:col-span-8 shadow-md">
		<template #title>
			<div class="flex justify-between">
				<h3>
					Jadwal Pegawai
				</h3>
				<div class="flex gap-2">
					<Button icon="pi pi-plus-circle" label="Tambah" @click="toggleJadwalPegawai()" />
				</div>
			</div>
		</template>
		<template #content>
			<TableDefault :columns="columns" api="/jadwal/pegawai" id="id" />
		</template>
	</Card>

	<DialogJadwalPegawai :visible="visible" @toggle="toggleJadwalPegawai"></DialogJadwalPegawai>
</template>

<script>
export default {
	name:'CardJadwalPegawai',
	inject:['default'],
	data() {
		return {
			// Table
			columns: [
				{ field: 'nama_pegawai', header: 'Nama Pegawai', editable: false },
				{ field: 'jabatan', header: 'Jabatan', editable: false },
				{ field: 'jadwal.nama_jadwal', header: 'Nama Jadwal', editable: true },
			],
			visible: false
		}
	},
	methods: {
		toggleJadwalPegawai() {
			this.visible = !this.visible
		}
	},
	mounted() {
	},
}
</script>
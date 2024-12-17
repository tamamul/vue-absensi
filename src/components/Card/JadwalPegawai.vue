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
			<TableDefault :columns="columns" api="/jadwal/pegawai" id="id" @openEdit="handleEdit" @openDelete="handleDelete" @fetchData="handleFetch" deleteText="Jadwal Pegawai" />
		</template>
	</Card>

	<DialogJadwalPegawai 
		:visible="visible" 
		@toggle="toggleJadwalPegawai"
		:id="id"
	/>
</template>

<script>
export default {
	name:'CardJadwalPegawai',
	data() {
		return {
			// Table
			columns: [
				{ field: 'nama_pegawai', header: 'Nama Pegawai' },
				{ field: 'jadwal.nama_jadwal', header: 'Nama Jadwal' },
			],
			visible: false,
			id: null,
		}
	},
	methods: {
		toggleJadwalPegawai() {
			this.visible = !this.visible
		},
		handleEdit(id) {
			console.log(id)
			this.visible = true
			this.id = id
		},
		handleDelete(id) {
			console.log(id)
			deleteData('/jadwal/pegawai', id)
			getData('jadwal/pegawai')
		},
		handleFetch() {
			getData('jadwal/pegawai')
		}
	},
	mounted() {
	},
}
</script>
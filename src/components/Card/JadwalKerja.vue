<template>
	<Card class="col-span-12 shadow-md">
		<template #title>
			<div class="flex justify-between">
				<h3>Daftar Jadwal Kerja</h3>
				<Button icon="pi pi-plus-circle" label="Tambah" @click="toggleJadwalKerja()" />
			</div>
		</template>
		<template #content>
			<TableDefault :columns="columns" api="/jadwal" id="id_jadwal" @openEdit="handleEdit" @openDelete="handleDelete">
				<Column header="Menggunakan Shift" style="max-width: 400px;">
					<template #body="slotProps">
						<div class="flex gap-2 flex-wrap">
							<div
								v-for="(item, index) in slotProps.data.jadwal"
								:key="index"
								class="color-box"
								:style="{ backgroundColor: item.warna }"
								>
								{{ item.nama_shift + ' | ' + item.hari }}
							</div>
						</div>
					</template>
				</Column>
			</TableDefault>
		</template>
	</Card>

	<DialogJadwalKerja :visible="visible" @toggle="toggleJadwalKerja" :id="jadwalKerja" />
</template>

<script>
export default {
	name: 'CardJadwalKerja',
	data() {
		return {
			jadwalKerja: null,
			visible: false,
			columns: [
				{ field: 'nama_jadwal', header: 'Nama Jadwal' },
			],
		};
	},
	computed: {
		// Jika Anda ingin menghitung data dari API di luar slotProps
		getColors() {
			// Placeholder warna, misalkan Anda memproses data di sini
			return this.dataFromAPI?.jadwal?.map(item => item.warna) || [];
		},
	},
	methods: {
		toggleJadwalKerja() {
			this.visible = !this.visible;
		},
		handleEdit(id) {
			console.log(id);
			this.visible = true;
			this.jadwalKerja = id;
		},
		handleDelete(id) {
			console.log(id);
			deleteData('/jadwal', id);
		},
	},
};
</script>

<style scoped>
.color-box {
	display: inline-block;
	min-width: 100px;
	padding: 8px;
	margin: 4px;
	text-align: center;
	color: white; /* Supaya warna teks kontras */
	border-radius: 4px;
}
</style>

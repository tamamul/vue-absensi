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
				<Column header="Nama Jadwal">
					<template #body="slotProps">
						{{ slotProps.data.is_default ? 'Default ' + slotProps.data.nama_jadwal : slotProps.data.nama_jadwal }}
					</template>
				</Column>
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

	<DialogJadwalKerja ref="dialogJadwalKerja" :visible="visible" @toggle="toggleJadwalKerja" :id="jadwalKerja" />
</template>

<script>
export default {
	name: 'CardJadwalKerja',
	data() {
		return {
			jadwalKerja: null,
			visible: false,
		};
	},
	computed: {
		getColors() {
			return this.dataFromAPI?.jadwal?.map(item => item.warna) || [];
		},
	},
	methods: {
		toggleJadwalKerja() {
			this.visible = !this.visible;
		},
		handleEdit(id) {
			this.visible = true;
			this.jadwalKerja = id;
			this.$nextTick(() => {
				this.$refs.dialogJadwalKerja.updateData(id);
			});
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
	color: white;
	border-radius: 4px;
}
</style>

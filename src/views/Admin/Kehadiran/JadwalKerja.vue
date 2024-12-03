<template>
	<div class="grid grid-cols-12 m-5 gap-5">
		<Card class="col-span-12 shadow-md">
			<template #title>
				<div class="flex justify-between">
                    <h3>
						Jadwal Kerja
					</h3>
                    <div class="flex gap-2">
						<Button icon="pi pi-plus-circle" label="Tambah Jadwal" @click="toggleDialog"></Button>
                        <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                    </div>
                </div>
			</template>
			<template #content>
				<div>
					
				</div>
				<TableDefault :columns="columns" api="/jadwal" id="id_jadwal" />
			</template>
		</Card>

		<DialogJadwalKerja :test="visible" @toggle="toggleDialog" />
	</div>
</template>

<script>
export default {
	name:'JadwalKerja',
	inject:['default'],
	data() {
		return {
			visible: false,
			columns: [
				{ field: 'nama_jadwal', header: 'Nama Jadwal' },
				{ field: 'gaji_pokok', header: 'Default' },
			]
		}
	},
	methods: {
		toggleDialog() {
			this.visible = !this.visible
			console.log(this.visible)
		}
	}
}
</script>
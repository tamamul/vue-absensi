<template>
	<div class="grid grid-cols-12 m-5 gap-5">
		<Card class="col-span-12 shadow-md">
			<template #title>
				<div class="flex justify-between">
                    <h3>
						Jadwal Shift
					</h3>
                    <div class="flex gap-2">
                        <RouterLink to="/gaji/tambah">    
                            <Button icon="pi pi-plus-circle" label="Tambah Jadwal"></Button>
                        </RouterLink>
                        <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                    </div>
                </div>
			</template>
			<template #content>
				<TableDefault :columns="columns" api="/jadwal/pegawai" id="jabatan">
					
				</TableDefault>
			</template>
		</Card>
	</div>
</template>

<script>
export default {
	name:'JadwalKerja',
	inject:['default'],
	data() {
		return {
			columns: [
				{ field: 'nama_pegawai', header: 'Nama Pegawai' },
				{ field: 'jabatan', header: 'Jabatan' },
				{ field: 'jadwal.nama_jadwal', header: 'Nama Jadwal' },
			]
		}
	},
}
</script>
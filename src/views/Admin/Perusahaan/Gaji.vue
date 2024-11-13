<template>
	<div class="grid grid-cols-12 m-5 gap-5">
		<Card class="col-span-12 xl:col-span-8 shadow-md">
			<template #title>
				<div class="flex justify-between">
                    <h3>
						Data Gaji Pokok Pegawai
					</h3>
                    <div class="flex gap-2">
                        <RouterLink to="/gaji/tambah">    
                            <Button icon="pi pi-plus-circle" label="Tambah Gaji"></Button>
                        </RouterLink>
                        <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                    </div>
                </div>
			</template>
			<template #content>
				<TableDefault :columns="columns" api="/gaji" id="id_gaji" />
			</template>
		</Card>
		<Card class="col-span-12 xl:col-span-4 shadow-md">
			<template #title>
				Total Gaji Bulan Ini
			</template>
			<template #content>
			</template>
		</Card>
	</div>
</template>
<script>
export default {
    data() {
        return {
            isLoading: true,
			columns: [
				{ field: 'nama_pegawai', header: 'Nama Pegawai' },
				{ field: 'gaji_pokok', header: 'Gaji Pokok' },
				{ field: 'tunjangan', header: 'Tunjangan' },
				{ field: 'nama_bank', header: 'Nama Bank' },
				{ field: 'rekening', header: 'No. Rekening' },
			]
        };
    },
};
</script>
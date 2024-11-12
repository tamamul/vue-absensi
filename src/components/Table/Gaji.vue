<template>
	<DataTable 
		v-model:filters="filters"
		:value="gajiPokok"
		tableStyle="min-width: 50rem"
		paginator
		:rows="10" 
		:rowsPerPageOptions="[5, 10, 20, 50]"
		scrollable
		:loading="loading"
		filterDisplay="menu"
	>
		<template #header>
			<div class="flex justify-between">
				<Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
				<InputText v-model="filters['global'].value" placeholder="Keyword Search" />
			</div>
		</template>
		<template #empty> Data tidak ditemukan. </template>

		<Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
		<TableActionStandard
			:onEdit="handleEdit" 
			:onDelete="handleDelete" 
			:id="id_gaji"
		/>
	</DataTable>
</template>

<script>
export default {
	name:'TableGaji',
	inject:['default'],
	data() {
		return {
			gajiPokok: [],
			filters: { global: { value: null, matchMode: 'contains' } },
			loading: true,
			columns: [
				{ field: 'id_gaji', header: 'No.' },
				{ field: 'nama_pegawai', header: 'Nama Pegawai' },
				{ field: 'gaji_pokok', header: 'Gaji Pokok' },
				{ field: 'tunjangan', header: 'Tunjangan' },
				{ field: 'nama_bank', header: 'Nama Bank' },
				{ field: 'rekening', header: 'No. Rekening' },
			]
		}
	},
	methods: {
		async getGajiPokok() {
			await axios.get('/gaji').then((res) => {
				this.gajiPokok = res.data.data;
				console.log(res.data.data);
				this.loading = false;
			});
		},
		handleEdit(id) {
			console.log('Edit Pegawai ID:', id);
		},
		handleDelete(id) {
			console.log('Hapus Pegawai ID:', id);
		},
		clearFilter() {
			this.filters = { global: { value: null, matchMode: 'contains' } };
		},
	},
	mounted() {
		this.getGajiPokok();
	}
}
</script>

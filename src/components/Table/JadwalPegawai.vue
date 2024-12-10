<template>
	<DataTable :value="dataJadwal" tableStyle="min-width: 50rem" :loading="loading">
		<Column field="no" header="No.">
            <template #body="slotProps">
				{{ calculateRowNumber(slotProps) + `.` }}
            </template>
        </Column>
		<Column field="nama_pegawai" header="Nama Pegawai"></Column>
		<Column field="jabatan" header="Jabatan"></Column>
		<Column field="nama_jadwal" header="Nama Jadwal"></Column>
	</DataTable>
</template>

<script>
export default {
	name:'TableJadwalPegawai',
	inject:['default'],
	data() {
		return {
			dataJadwal: [],
			loading: true
		}
	},
	methods: {
		calculateRowNumber(slotProps) {
            const firstIndex = this.$refs.dt && this.$refs.dt.first ? this.$refs.dt.first : 0;
            return firstIndex + this.data.indexOf(slotProps.data) + 1;
        },
		async getData() { 
            await axios.get('/jadwal/pegawai').then((res) => { 
                this.dataJadwal = res.data.data; 
                console.log(res.data.data); 
                this.loading = false; 
            }).catch((err) => { 
                console.log(err); 
            }); 
        }, 
	},
	mounted() {
	},
}
</script>
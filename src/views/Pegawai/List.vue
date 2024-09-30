<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>
	<div class="grid grid-cols-12 gap-5 m-5" v-else>
		<Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-12">
			<template #title>
                <div class="flex justify-between">
                    <h3>Daftar Pegawai</h3>
                    <div class="flex gap-2">
                        <RouterLink to="/pegawai/tambah">    
                            <Button icon="pi pi-user-plus" label="Tambah Pegawai"></Button>
                        </RouterLink>
                        <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                    </div>
                </div>
            </template>
            <template #content>
				<DataTable 
                    :value="pegawai" 
                    paginator  
                    :rows="10" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                    scrollable 
                    scrollHeight="400px" 
                    tableStyle="min-width: 50rem"
                >
                    <!-- Columns -->
                    <Column field="id_pegawai" header="No" />
                    <Column field="nama_lengkap" header="Nama" style="min-width: 300px" />
                    <Column field="jk" header="Jenis Kelamin" style="min-width: 150px" />
                    <Column field="jabatan" header="Jabatan" style="min-width: 200px" />
                    <Column field="email" header="Email" style="min-width: 250px" />
                    <Column field="rekening" header="Rekening" style="min-width: 250px" />
                    <Column field="nik" header="NIK" style="min-width: 250px" />
                    <Column field="tempat_lahir" header="Tempat Lahir" style="min-width: 200px" />
                    <Column field="tgl_lahir" header="Tanggal Lahir" style="min-width: 200px" />
                    <Column field="alamat" header="Alamat" style="min-width: 250px" />
                    <Column field="no_telp" header="No. Telepon" style="min-width: 200px" />
                    <Column field="kontak_darurat" header="No. Telp Darurat" style="min-width: 200px" />
                    <Column field="agama" header="Agama" style="min-width: 150px" />
                    <Column field="gol_darah" header="Gol. Darah" style="min-width: 150px" />
                    <Column field="pendidikan" header="Pendidikan" style="min-width: 150px" />
                    <Column field="mulai_kerja" header="Mulai Kerja" style="min-width: 150px" />
                    <Column field="" header="Action" frozen alignFrozen="right">
                        <template #body="slotProps">
                            <div class="flex gap-2 bg-white">
                                <Button icon="pi pi-envelope" severity="success" aria-label="Notification" />
                                <Button icon="pi pi-trash" severity="danger" aria-label="Notification" />
                                <RouterLink :to="`edit/${slotProps.data.id_pegawai}`">
                                    <Button icon="pi pi-pencil" severity="info" aria-label="Notification" @click="visible = true" />
                                </RouterLink>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>
	</div>
</template>

<script>
import router from '@/router'
export default {
	name: 'DaftarPegawai',
    inject: ['default'],
	data() {
		return {
			pegawai     : [],
            editPegawai : [],
			isLoading   : true,
            no: 1,
		}
	},
	methods: {
		async getPegawai() {
            await axios.get('pegawai', {
                headers: {
                    'Authorization': `Bearer ${this.default.token}`
                }
            }).then((res) => {
                this.isLoading = false
                this.pegawai = res.data.data;
            }).catch((err) => {
                console.log("Error:" + err);
                router.push({name : 'dashboard'})
            })
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        }
	},
	mounted() {
        this.getPegawai()
	},
}
</script>

<style>
.p-datatable-header{
    background: white;
}
/* .p-datatable-scrollable .p-datatable-frozen-column{
    background: white;
} */
</style>

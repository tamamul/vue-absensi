<template>
	<div class="grid grid-cols-12 gap-5 m-5" v-if="isLoading">
		<Skeleton class="col-span-12" width="100%" height="80vh"></Skeleton>
	</div>
	<div class="grid grid-cols-12 gap-5 m-5" v-else>
		<Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-12">
			<template #title>Daftar Pegawai</template>
            <template #content>
				<DataTable :value="pegawai" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem"
                >
                    <!-- <Column field="foto" header="Foto"></Column> -->
                    <Column field="id_pegawai" header="No"></Column>
                    <Column field="nama_lengkap" header="Nama"></Column>
                    <Column field="jk" header="Jenis Kelamin"></Column>
                    <Column field="jabatan" header="Jabatan"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="rekening" header="Rekening"></Column>
                    <Column field="nik" header="NIK"></Column>
                    <Column field="tempat_lahir" header="Tempat Lahir"></Column>
                    <Column field="tgl_lahir" header="Tanggal Lahir"></Column>
                    <Column field="alamat" header="Alamat"></Column>
                    <Column field="no_telp" header="No. Telepon"></Column>
                    <Column field="kontak_darurat" header="No. Telp Darurat"></Column>
                    <Column field="agama" header="Agama"></Column>
                    <Column field="gol_darah" header="Gol. Darah"></Column>
                    <Column field="pendidikan" header="Pendidikan"></Column>
                    <Column field="mulai_kerja" header="Mulai Kerja"></Column>
                    <Column  header="Action" frozen>
                        <Button icon="pi pi-bell" severity="warn" aria-label="Notification" />
                    </Column>
                </DataTable>
            </template>
        </Card>
	</div>
</template>

<script>
export default {
	name: 'DaftarPegawai',
    inject: ['default'],
	data() {
		return {
			pegawai: [],
			isLoading: true,
            noAI: 1
		}
	},
    computed: {
        no() {
            this.noAI += 1;
            return this.noAI;
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
                console.log(res.data.data)
            }).catch((err) => {
                console.log("Error:" + err);
            })
        },
	},
	mounted() {
        this.getPegawai()
	},
}
</script>

<style>

</style>
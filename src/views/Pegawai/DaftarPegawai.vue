<template>
	<div class="grid grid-cols-12 gap-5 m-5" v-if="isLoading">
		<Skeleton></Skeleton>
	</div>
	<div class="grid grid-cols-12 gap-5 m-5" v-else>
		<Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-12">
			<template #title>Daftar Pegawai</template>
            <template #content>
				<DataTable :value="pegawai" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem">
                    <Column field="id" header="No"></Column>
                    <!-- <Column field="foto" header="Foto"></Column> -->
                    <Column field="nama" header="Nama"></Column>
                    <Column field="tanggal_lahir" header="Tanggal Lahir"></Column>
                    <Column field="alamat" header="Alamat"></Column>
                    <Column field="no_telp" header="No. Telepon"></Column>
                    <Column field="no_telp_darurat" header="No. Telepon Darurat"></Column>
                    <Column header="Action">
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
			isLoading: true
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
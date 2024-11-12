<template>
    <div class="card">
        <DataTable 
            v-model:filters="filters"
            :value="pegawai"
            paginator
            :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            scrollable
            tableStyle="min-width: 50rem"
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

            <Column field="id_pegawai" header="No" />
            <Column field="nama_lengkap" header="Nama" style="min-width: 300px" class="capitalize" />
			<Column field="" header="Jenis Kelamin" style="min-width: 150px">
				<template #body="slotProps">
					{{ slotProps.data.jk == 'l' ? 'Laki-laki' : 'Perempuan' }}
				</template>
			</Column>
			<Column field="jabatan"         header="Jabatan" style="min-width: 200px" />
			<Column field="email"           header="Email" style="min-width: 250px" />
			<Column field="rekening"        header="Rekening" style="min-width: 250px" />
			<Column field="nik"             header="NIK" style="min-width: 250px" />
			<Column field="tempat_lahir"    header="Tempat Lahir" style="min-width: 200px" class="capitalize" />
			<Column field="tgl_lahir"       header="Tanggal Lahir" style="min-width: 200px" />
			<Column field="alamat"          header="Alamat" style="min-width: 250px" class="capitalize" />
			<Column field="no_telp"         header="No. Telepon" style="min-width: 200px" />
			<Column field="kontak_darurat"  header="No. Telp Darurat" style="min-width: 200px" />
			<Column field="agama"           header="Agama" style="min-width: 150px" class="capitalize" />
			<Column field="gol_darah"       header="Gol. Darah" style="min-width: 150px" />
			<Column field="pendidikan"      header="Pendidikan" style="min-width: 150px" class="capitalize" />
			<Column field="mulai_kerja"     header="Mulai Kerja" style="min-width: 150px" />

            <Column header="Action" frozen alignFrozen="right">
                <template #body="slotProps">
                    <div class="flex gap-2 bg-white">
                        <Button 
							icon="pi pi-envelope" 
							severity="success" 
							aria-label="Notification" 
							@click="handleEmailVerification(slotProps.data.email)" 
						/>
						<Button 
							icon="pi pi-pencil" 
							severity="info" 
							aria-label="Notification" 
							@click="handleEdit(slotProps.data.id_pegawai)" 
						/>
						<Button 
							icon="pi pi-trash" 
							severity="danger" 
							aria-label="Notification" 
							@click="handleDelete(slotProps.data.id_pegawai)" 
						/>
                    </div>
                </template>
            </Column>

        </DataTable>
    </div>
</template>

<script>
export default {
    name: 'TablePegawai',
    data() {
        return {
            pegawai: [],
            filters: { global: { value: null, matchMode: 'contains' } },
            genderOptions: [
                { label: 'Laki-laki', value: 'l' },
                { label: 'Perempuan', value: 'p' }
            ],
            loading: true,
        };
    },
    methods: {
        async getPegawaiAll() {
            try {
                const res = await axios.get('pegawai');
                this.pegawai = res.data.data;
                this.loading = false;
            } catch (err) {
                console.log("Error:" + err);
                this.loading = false;
            }
        },
        clearFilter() {
            this.filters = { global: { value: null, matchMode: 'contains' } };
        },
		handleEmailVerification(email) {
			this.$emit('email-verification', email);
		},
		handleDelete(id) {
			this.$emit('delete-pegawai', id);
		},
		handleEdit(id) {
			this.$emit('edit-pegawai', id);
		},
    },
    mounted() {
        this.getPegawaiAll();
    },
};
</script>

<style scoped>
/* Add any specific styling if needed */
</style>

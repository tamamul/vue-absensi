<template>
	<div class="grid grid-cols-12 gap-5 m-5" v-if="isLoading">
		<Skeleton class="col-span-12" width="100%" height="80vh"></Skeleton>
	</div>
	<div class="grid grid-cols-12 gap-5 m-5" v-else>
		<Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-12">
			<template #title>Daftar Pegawai</template>
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
                    <!-- Regular Columns -->
                    <Column field="id_pegawai" header="No"></Column>
                    <Column field="nama_lengkap" header="Nama" style="min-width: 300px"></Column>
                    <Column field="jk" header="Jenis Kelamin" style="min-width: 150px"></Column>
                    <Column field="jabatan" header="Jabatan" style="min-width: 200px"></Column>
                    <Column field="email" header="Email" style="min-width: 250px"></Column>
                    <Column field="rekening" header="Rekening" style="min-width: 250px"></Column>
                    <Column field="nik" header="NIK" style="min-width: 250px"></Column>
                    <Column field="tempat_lahir" header="Tempat Lahir" style="min-width: 200px"></Column>
                    <Column field="tgl_lahir" header="Tanggal Lahir" style="min-width: 200px"></Column>
                    <Column field="alamat" header="Alamat" style="min-width: 250px"></Column>
                    <Column field="no_telp" header="No. Telepon" style="min-width: 200px"></Column>
                    <Column field="kontak_darurat" header="No. Telp Darurat" style="min-width: 200px"></Column>
                    <Column field="agama" header="Agama" style="min-width: 150px"></Column>
                    <Column field="gol_darah" header="Gol. Darah" style="min-width: 150px"></Column>
                    <Column field="pendidikan" header="Pendidikan" style="min-width: 150px"></Column>
                    <Column field="mulai_kerja" header="Mulai Kerja" style="min-width: 150px"></Column>
                    <Column field="" header="Action" frozen alignFrozen="right">
                        <template #body>
                            <div class="flex gap-2">
                                <Button icon="pi pi-envelope" severity="success" aria-label="Notification" />
                                <Button icon="pi pi-trash" severity="danger" aria-label="Notification" />
                                <Button icon="pi pi-pencil" severity="info" aria-label="Notification" @click="visible = true" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>

        <Dialog v-model:visible="visible" modal maximizable header="Edit Pegawai" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>

            <form class="flex flex-col w-full gap-4">
                <div class="grid grid-cols-12 gap-4">

                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="nama_lengkap">Nama Lengkap <span class="text-red-500">*</span></label>
                        <InputText id="nama_lengkap" v-model="nama_lengkap" class="col-span-12" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="email">Email <span class="text-red-500">*</span></label>
                        <InputText id="email" v-model="email" class="col-span-12" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="nik">NIK <span class="text-red-500">*</span></label>
                        <InputText v-model="nik" id="nik" :useGrouping="false" fluid class="col-span-12" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="tempat_lahir">Tempat Lahir <span class="text-red-500">*</span></label>
                        <InputText id="tempat_lahir" v-model="tempat_lahir" class="col-span-12" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="tgl_lahir">Tanggal Lahir <span class="text-red-500">*</span></label>
                        <DatePicker inputId="tgl_lahir" v-model="tgl_lahir" Date dateFormat="yy-mm-dd" class="col-span-12" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="alamat">Alamat <span class="text-red-500">*</span></label>
                        <InputText id="alamat" v-model="alamat" class="col-span-12" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="jk">Jenis Kelamin <span class="text-red-500">*</span></label>
                        <Select inputId="jk" v-model="jk" :options="formJenisKelamin" optionLabel="name" optionValue="code" class="col-span-12" />
                    </div>
                    
                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="agama">Agama <span class="text-red-500">*</span></label>
                        <Select inputId="agama" v-model="agama" :options="formAgama" optionLabel="name" optionValue="code" class="col-span-12" />
                    </div>
                    
                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="gol_darah">Golongan Darah <span class="text-red-500">*</span></label>
                        <Select inputId="gol_darah" v-model="gol_darah" :options="formGolDarah" optionLabel="name" optionValue="code" class="col-span-12" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="no_telp">Nomor Telpon <span class="text-red-500">*</span></label>
                        <InputText id="no_telp" :useGrouping="false" fluid v-model="no_telp" class="col-span-12" />
                    </div>
                    
                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="kontak_darurat">Kontak Darurat <span class="text-red-500">*</span></label>
                        <InputText id="kontak_darurat" :useGrouping="false" fluid v-model="kontak_darurat" class="col-span-12" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="rekening">Rekening <span class="text-red-500">*</span></label>
                        <InputText id="rekening" v-model="rekening" class="col-span-12" />
                    </div>
                    
                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="mulai_kerja">Mulai Kerja <span class="text-red-500">*</span></label>
                        <DatePicker inputId="mulai_kerja" v-model="mulai_kerja" dateFormat="dd-mm-yy" class="col-span-12" />
                    </div>
                    
                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="jabatan">Jabatan <span class="text-red-500">*</span></label>
                        <InputText id="jabatan" v-model="jabatan" class="col-span-12" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                        <label class="col-span-12" for="pendidikan">Pendidikan <span class="text-red-500">*</span></label>
                        <InputText id="pendidikan" v-model="pendidikan" class="col-span-12" />
                    </div>

                    <div class="col-span-12 justify-end gap-2">
                        <div class="flex gap-3">
                            <Button type="button" label="Save" @click="postPegawai"></Button>
                        </div>
                    </div>

                </div>
            </form>

        </Dialog>
	</div>
</template>

<script>
export default {
	name: 'DaftarPegawai',
    inject: ['default'],
	data() {
		return {
			pegawai     : [],
            editPegawai : [],
            visible     : false,
			isLoading   : true,
            formJenisKelamin: [
                { name: 'Laki-Laki', code: 'l' },
                { name: 'Perempuan', code: 'p' }
            ],
            formAgama: [
                { name: 'Islam',    code: 'islam' },
                { name: 'Kristen',  code: 'kristen' },
                { name: 'Katolik',  code: 'katolik' },
                { name: 'Hindu',    code: 'hindu' },
                { name: 'Buddha',   code: 'buddha' },
                { name: 'Konghucu', code: 'konghucu' }
            ],
            formGolDarah: [
                { name: 'A',    code: 'A' },
                { name: 'B',    code: 'B' },
                { name: 'AB',   code: 'AB' },
                { name: 'O',    code: 'O' },
                { name: 'A+',   code: 'A+' },
                { name: 'B+',   code: 'B+' },
                { name: 'AB+',  code: 'AB+' },
                { name: 'O+',   code: 'O+' },
                { name: 'A-',   code: 'A-' },
                { name: 'B-',   code: 'B-' },
                { name: 'AB-',  code: 'AB-' },
                { name: 'O-',   code: 'O-' }
            ],
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
            })
        },
        async putPegawai() {
            await axios.get('url')
        }
	},
	mounted() {
        this.getPegawai()
	},
}
</script>

<style>

</style>

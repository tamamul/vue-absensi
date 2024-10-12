<template>
    <ConfirmPopup />
    <PageLoading v-if="isLoading"></PageLoading>
	<div class="grid grid-cols-12 gap-5 m-5 mb-24 lg:mb-5" v-else>
		<Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-12">
			<template #title>
                <div class="flex justify-between">
                    <h3>Daftar Pegawai</h3>
                    <div class="flex gap-2">
                        <!-- <RouterLink to="/pegawai/tambah">     -->
                        <!-- </RouterLink> -->
                        <Button icon="pi pi-user-plus" label="Tambah Pegawai" @click="openPost"></Button>
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
                    tableStyle="min-width: 50rem"
                >
                    <!-- Columns -->
                    <Column field="id_pegawai" header="No" />
                    <Column field="nama_lengkap" header="Nama" style="min-width: 300px" class="capitalize" />
                    <Column field="" header="Jenis Kelamin" style="min-width: 150px">
                        <template #body="slotProps">
                            {{ slotProps.data.jk == 'l' ? 'Laki-laki' : 'Perempuan' }}
                        </template>
                    </Column>
                    <Column field="jabatan" header="Jabatan" style="min-width: 200px" />
                    <Column field="email" header="Email" style="min-width: 250px" />
                    <Column field="rekening" header="Rekening" style="min-width: 250px" />
                    <Column field="nik" header="NIK" style="min-width: 250px" />
                    <Column field="tempat_lahir" header="Tempat Lahir" style="min-width: 200px" class="capitalize" />
                    <Column field="tgl_lahir" header="Tanggal Lahir" style="min-width: 200px" />
                    <Column field="alamat" header="Alamat" style="min-width: 250px" class="capitalize" />
                    <Column field="no_telp" header="No. Telepon" style="min-width: 200px" />
                    <Column field="kontak_darurat" header="No. Telp Darurat" style="min-width: 200px" />
                    <Column field="agama" header="Agama" style="min-width: 150px" class="capitalize" />
                    <Column field="gol_darah" header="Gol. Darah" style="min-width: 150px" />
                    <Column field="pendidikan" header="Pendidikan" style="min-width: 150px" class="capitalize" />
                    <Column field="mulai_kerja" header="Mulai Kerja" style="min-width: 150px" />
                    <Column field="" header="Action" frozen alignFrozen="right">
                        <template #body="slotProps">
                            <div class="flex gap-2 bg-white">
                                <Button icon="pi pi-envelope" severity="success" aria-label="Notification" @click="openEmailVerification($event, slotProps.data.email)" />
                                <Button icon="pi pi-trash" severity="danger" aria-label="Notification" @click="deletePegawai($event, slotProps.data.id_pegawai)" />
                                <Button icon="pi pi-pencil" severity="info" aria-label="Notification" @click="openEdit(slotProps.data.id_pegawai)" />
                                <!-- <RouterLink :to="`edit/${slotProps.data.id_pegawai}`"> -->
                                <!-- </RouterLink> -->
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>
	</div>

    <Dialog v-model:visible="visible" modal :header="dialogTitle" :style="{ width: '75rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ dialogDeskripsi }}</span>
        <div class="grid grid-cols-12 gap-5 h-96 m-5" v-if="formIsLoading">
            <div class="col-span-12 w-full flex justify-center items-center">
                <ProgressSpinner />
            </div>
        </div>
        <form class="w-full grid grid-cols-12 gap-2" v-else>

            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="nama_lengkap">Nama Lengkap <span class="text-red-500">*</span></label>
                <InputText id="nama_lengkap" v-model="nama_lengkap" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.nama_lengkap.$invalid" />
                <small v-if="hasValidated && v$.nama_lengkap.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>

            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="email">Email <span class="text-red-500">*</span></label>
                <InputText id="email" v-model="email" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.email.$invalid" />
                <small v-if="hasValidated && v$.email.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>

            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="nik">NIK <span class="text-red-500">*</span></label>
                <InputText v-model="nik" id="nik" :useGrouping="false" fluid class="col-span-12" :invalid="hasValidated && v$.nik.$invalid" />
                <small v-if="hasValidated && v$.nik.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>

            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="tempat_lahir">Tempat Lahir <span class="text-red-500">*</span></label>
                <InputText id="tempat_lahir" v-model="tempat_lahir" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.tempat_lahir.$invalid" />
                <small v-if="hasValidated && v$.tempat_lahir.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>

            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="tgl_lahir">Tanggal Lahir <span class="text-red-500">*</span></label>
                <DatePicker inputId="tgl_lahir" v-model="tgl_lahir" Date dateFormat="yy-mm-dd" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.tgl_lahir.$invalid" />
                <small v-if="hasValidated && v$.tgl_lahir.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>

            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="alamat">Alamat <span class="text-red-500">*</span></label>
                <InputText id="alamat" v-model="alamat" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.alamat.$invalid" />
                <small v-if="hasValidated && v$.alamat.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>

            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="jk">Jenis Kelamin <span class="text-red-500">*</span></label>
                <Select inputId="jk" v-model="jk" :options="options.jenisKelamin" optionLabel="name" optionValue="code" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.jk.$invalid" />
                <small v-if="hasValidated && v$.jk.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>
            
            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="agama">Agama <span class="text-red-500">*</span></label>
                <Select inputId="agama" v-model="agama" :options="options.agama" optionLabel="name" optionValue="code" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.agama.$invalid" />
                <small v-if="hasValidated && v$.agama.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>
            
            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="gol_darah">Golongan Darah <span class="text-red-500">*</span></label>
                <Select inputId="gol_darah" v-model="gol_darah" :options="options.golDarah" optionLabel="name" optionValue="code" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.gol_darah.$invalid" />
                <small v-if="hasValidated && v$.gol_darah.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>

            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="no_telp">Nomor Telpon <span class="text-red-500">*</span></label>
                <InputText id="no_telp" :useGrouping="false" fluid v-model="no_telp" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.no_telp.$invalid" />
                <small v-if="hasValidated && v$.no_telp.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>
            
            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="kontak_darurat">Kontak Darurat <span class="text-red-500">*</span></label>
                <InputText id="kontak_darurat" :useGrouping="false" fluid v-model="kontak_darurat" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.kontak_darurat.$invalid" />
                <small v-if="hasValidated && v$.kontak_darurat.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>

            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="rekening">Rekening <span class="text-red-500">*</span></label>
                <InputText id="rekening" v-model="rekening" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.rekening.$invalid" />
                <small v-if="hasValidated && v$.rekening.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>
            
            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="mulai_kerja">Mulai Kerja <span class="text-red-500">*</span></label>
                <DatePicker inputId="mulai_kerja" v-model="mulai_kerja" dateFormat="dd-mm-yy" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.mulai_kerja.$invalid" />
                <small v-if="hasValidated && v$.mulai_kerja.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>
            
            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="jabatan">Jabatan <span class="text-red-500">*</span></label>
                <InputText id="jabatan" v-model="jabatan" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.jabatan.$invalid" />
                <small v-if="hasValidated && v$.jabatan.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>

            <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
                <label class="max-h-6 col-span-12" for="pendidikan">Pendidikan <span class="text-red-500">*</span></label>
                <InputText id="pendidikan" v-model="pendidikan" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.pendidikan.$invalid" />
                <small v-if="hasValidated && v$.pendidikan.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
                <small v-else class="invisible">...</small>
            </div>

            <div class="col-span-12 flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="close"></Button>
                <Button type="button" label="Edit" :loading="btnIsLoading" @click="editPegawai(id_pegawai)" v-if="!formPost"></Button>
                <Button type="button" label="Tambahkan" :loading="btnIsLoading" @click="postPegawai" v-else></Button>
            </div>

        </form>
    </Dialog>
</template>

<script>
import router from '@/router'
export default {
	name: 'AdminPegawai',
    inject: ['default'],
	data() {
		return {
            // Table
			pegawai: [],
            // Loading State
			isLoading: true,
            btnIsLoading: false,
			formIsLoading: true,
            // Dialog
            visible: false,
            dialogTitle: '',
            dialogDeskripsi: '',
            // Validation
            v$: useVuelidate(),
            hasValidated: false,
            // Form
            no: 1,
			editPegawaiData: [],
            formPost:false,
            options: {
                jenisKelamin: [
                    { name: 'Laki-Laki', code: 'l' },
                    { name: 'Perempuan', code: 'p' }
                ],
                agama: [
                    { name: 'Islam',    code: 'islam' },
                    { name: 'Kristen',  code: 'kristen' },
                    { name: 'Katolik',  code: 'katolik' },
                    { name: 'Hindu',    code: 'hindu' },
                    { name: 'Buddha',   code: 'buddha' },
                    { name: 'Konghucu', code: 'konghucu' }
                ],
                golDarah: [
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
            },
            // the form
            id_pegawai      : '',
            nama_lengkap    : '',
            email           : '',
            nik             : '',
            tgl_lahir       : null,
            tempat_lahir    : '',
            jk              : '',
            agama           : '',
            gol_darah       : '',
            pendidikan      : '',
            kontak_darurat  : '08',
            mulai_kerja     : null,
            jabatan         : '',
            alamat          : '',
            no_telp         : '08',
            rekening        : '',
		}
	},
    validations () {
        return {
            id_pegawai      : { required },
            nama_lengkap    : { required },
            email           : { required, email },
            nik             : { required },
            tgl_lahir       : { required },
            tempat_lahir    : { required },
            jk              : { required },
            agama           : { required },
            gol_darah       : { required },
            pendidikan      : { required },
            kontak_darurat  : { required },
            mulai_kerja     : { required },
            jabatan         : { required },
            alamat          : { required },
            no_telp         : { required },
            rekening        : { required },
        }
    },
	methods: {
        // FORMAT TANGGAL
        formattedDate,

        // DIALOG
        openPost() {
            this.formPost = true
            this.visible = true
            this.formIsLoading = false
            this.dialogTitle    = 'Tambahkan Pegawai'
            this.dialogDeskripsi = 'Semua data dengan (*) wajib diisi!'
            this.nama_lengkap    = ''
            this.email           = ''
            this.nik             = ''
            this.tgl_lahir       = null
            this.tempat_lahir    = ''
            this.jk              = ''
            this.agama           = ''
            this.gol_darah       = ''
            this.pendidikan      = ''
            this.kontak_darurat  = '08'
            this.mulai_kerja     = null
            this.jabatan         = ''
            this.alamat          = ''
            this.no_telp         = '08'
            this.rekening        = ''
        },

        openEdit(id) {
            this.visible = true
            this.dialogTitle = 'Edit Pegawai'
            this.dialogDeskripsi = 'Semua data dengan (*) wajib diisi!'
            console.log(id)
            this.formPost = false
            this.getPegawaiById(id)
        },

        close() {
            this.visible = false
            this.formIsLoading = true
        },

        // Get All
        async getPegawaiAll() {
            await axios.get('pegawai', {
                // headers: {
                //     'Authorization': `Bearer ${this.default.token}`
                // }
            }).then((res) => {
                this.isLoading = false
                this.pegawai = res.data.data;
            }).catch((err) => {
                console.log("Error:" + err);
                router.push({name : 'not-found'})
            })
        },

        async getPegawaiById(id){
            await axios.get(`pegawai/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }).then((res) => {
                // this.isLoading = false
                const response = res.data.data
                this.editPegawaiData = response
                this.formIsLoading = false

                this.id_pegawai      = id
                this.nama_lengkap    = response.nama_lengkap
                this.email           = response.email
                this.nik             = response.nik
                this.tgl_lahir       = response.tgl_lahir
                this.tempat_lahir    = response.tempat_lahir
                this.jk              = response.jk
                this.agama           = response.agama
                this.gol_darah       = response.gol_darah
                this.pendidikan      = response.pendidikan
                this.kontak_darurat  = response.kontak_darurat
                this.mulai_kerja     = response.mulai_kerja
                this.jabatan         = response.jabatan
                this.alamat          = response.alamat
                this.no_telp         = response.no_telp
                this.rekening        = response.rekening
            }).catch((err) => {
                console.log(err)
                console.log(localStorage.getItem('token'));
            })
        },

        exportCSV() {
            this.$refs.dt.exportCSV();
        },

        async editPegawai(id) {
            this.btnIsLoading = true
            this.hasValidated = true
            this.v$.$validate()
            const data = {
                nama_lengkap    : this.nama_lengkap,
                email           : this.email,
                nik             : this.nik,
                tgl_lahir       : this.formattedDate(this.tgl_lahir),
                tempat_lahir    : this.tempat_lahir,
                jk              : this.jk,
                agama           : this.agama,
                gol_darah       : this.gol_darah,
                pendidikan      : this.pendidikan,
                kontak_darurat  : this.kontak_darurat,
                mulai_kerja     : this.formattedDate(this.mulai_kerja),
                jabatan         : this.jabatan,
                alamat          : this.alamat,
                no_telp         : this.no_telp,
                rekening        : this.rekening,
            }

            await axios.put(`pegawai/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                this.hasValidated = false
                console.log(res.data)
                this.visible = false
                this.btnIsLoading = false
                this.getPegawaiAll()
            }).catch((err) =>{
                // this.hasValidated = false
                console.log('Error ryan : ' +err);
                console.log(err);
                this.btnIsLoading = false
                console.log(localStorage.getItem('token'));
            })
        },

        async postPegawai() {
            this.btnIsLoading = true
            this.hasValidated = true
            this.v$.$validate()
            const data = {
                nama_lengkap    : this.nama_lengkap,
                email           : this.email,
                nik             : this.nik,
                tgl_lahir       : this.formattedDate(this.tgl_lahir),
                tempat_lahir    : this.tempat_lahir,
                jk              : this.jk,
                agama           : this.agama,
                gol_darah       : this.gol_darah,
                pendidikan      : this.pendidikan,
                kontak_darurat  : this.kontak_darurat,
                mulai_kerja     : this.formattedDate(this.mulai_kerja),
                jabatan         : this.jabatan,
                alamat          : this.alamat,
                no_telp         : this.no_telp,
                rekening        : this.rekening,
            }
            await axios.post('pegawai', data, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }).then((res) => {
                this.hasValidated = false
                // console.log(res.data);
                this.visible = false
                this.btnIsLoading = false
                console.log(this.v$)
                this.$toast.add({ severity: 'success', summary: 'Pegawai berhasil ditambahkan!', detail: `Menambahkan pegawai ${res.data.data.nama_lengkap}`, life: 5000 });
                this.getPegawaiAll()
            }).catch((err) =>{
                // this.hasValidated = false
                console.log(err);
                // this.v$
                console.log(this.v$)
                this.btnIsLoading = false
                this.$toast.add({ severity: 'error', summary: 'Pegawai gagal ditambahkan!', detail: `Gagal menambahkan pegawai`, life: 5000 });
                this.getPegawaiAll()
            })
        },

        async funDelete(id){
            await axios.delete(`pegawai/${id}`, {
                headers: { 'Authorization': `Bearer ${this.default.token}` }
            }).then((res) => {
                this.getPegawaiAll()
                console.log('berhasil delete')
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        },

        deletePegawai(event, id) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Do you want to delete this record?',
                icon: 'pi pi-info-circle',
                rejectProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Delete',
                    severity: 'danger'
                },
                accept: () => {
                    this.$toast.add({ severity: 'success', summary: 'Data berhasil dihapus', detail: 'Data pegawai berhasil dihapus', life: 5000 });
                    this.funDelete(id)
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Tidak jadi', detail: 'kamu memutuskan untuk tidak menghapus data nya', life: 5000 });
                }
            });
        },

        async emailVerification(email){
            const data = {
                'email' : email
            }
            await axios.post('email/send-verification', data, {
                headers: {'Authorization': `Bearer ${this.default.token}`}
            }).then((res) => {
                this.$toast.add({ severity: 'success', summary: 'Pegawai berhasil ditambahkan!', detail: `Menambahkan pegawai ${res.data.data.nama_lengkap}`, life: 5000 });
                console.log(res)
            }).catch((err) => {
                this.$toast.add({ severity: 'error', summary: 'Pegawai gagal ditambahkan!', detail: `Gagal menambahkan pegawai`, life: 5000 });
                console.log(err)
            })
        },

        openEmailVerification(event, email) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Kirim email verifikasi?',
                icon: 'pi pi-info-circle',
                rejectProps: {
                    label: 'Tidak',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Kirim',
                    severity: 'success'
                },
                accept: () => {
                    this.emailVerification(email)
                    this.$toast.add({ severity: 'success', summary: 'Email telah terkirim', detail: '', life: 5000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Tidak jadi', detail: 'kamu memutuskan untuk tidak menghapus data nya', life: 5000 });
                }
            });
        },
	},
	mounted() {
        this.getPegawaiAll()
	},
}
</script>

<style>
.p-datatable-header{
    background: white;
}
.p-dialog-close-button {
    display: none;
}
</style>

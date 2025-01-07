<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>

	<div class="grid grid-cols-12 m-5 mb-24 lg:mb-5" v-else>
		<Card class="col-span-12 shadow-md">
			<template #title>
				<h2 class="mb-5">
					User Profile
				</h2>
			</template>
			<template #content>
				<div class="flex flex-col gap-5">
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-12 md:col-span-6 flex items-center gap-5">
							<Image :src="avatar" :alt="nama_lengkap" class="w-32 border border-white shadow-md items-center justify-center rounded-full" />
							<div>
								<p class="text-xl font-bold">{{ nama_lengkap ?? 'Admin' }}</p>
								<p class="text-xl">{{ jabatan ?? 'HRD' }}</p>
								<p class="text-base font-light">{{ alamat ?? 'Jl. Andi Djemma No. 38' }}</p>
							</div>
						</div>
						<div class="col-span-12 md:col-span-6 flex items-center gap-3 justify-center">
							<!-- <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" /> -->
							<FileUpload mode="basic" class="py-3 px-4" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true" chooseLabel="Foto Profil" />
							<Button label="Hapus Foto" class="py-3 px-4" outlined severity="danger"></Button>
						</div>
					</div>

					<!-- <Divider /> -->

					<Tabs value="0" scrollable>
						<TabList>
							<Tab value="0">Informasi Pegawai</Tab>
							<Tab value="1">Ganti Password</Tab>
						</TabList>
						<TabPanels>
							<TabPanel value="0">
								<form class="w-full grid grid-cols-12 gap-2">
									<div class="col-span-12 mb-2 mt-5 ">
										<h3 class="text-lg font-semibold">Informasi Pribadi</h3>
										<small>Ganti Informasi Pribadi Hubungi Admin HRD</small>
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="nama_lengkap">Nama Lengkap</label>
										<InputText disabled id="nama_lengkap" v-model="nama_lengkap" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.nama_lengkap.$invalid" />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="nik">NIK</label>
										<InputText disabled v-model="nik" id="nik" :useGrouping="false" fluid class="col-span-12" :invalid="hasValidated && v$.nik.$invalid" />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="tempat_lahir">Tempat Lahir</label>
										<InputText disabled id="tempat_lahir" v-model="tempat_lahir" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.tempat_lahir.$invalid" />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="tgl_lahir">Tanggal Lahir</label>
										<DatePicker disabled inputId="tgl_lahir" v-model="tgl_lahir" Date dateFormat="yy-mm-dd" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.tgl_lahir.$invalid" />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="alamat">Alamat</label>
										<InputText disabled id="alamat" v-model="alamat" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.alamat.$invalid" />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="jk">Jenis Kelamin</label>
										<Select disabled inputId="jk" v-model="jk" :options="options.jenisKelamin" optionLabel="name" optionValue="code" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.jk.$invalid" />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="agama">Agama</label>
										<Select disabled inputId="agama" v-model="agama" :options="options.agama" optionLabel="name" optionValue="code" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.agama.$invalid" />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="gol_darah">Golongan Darah</label>
										<Select disabled inputId="gol_darah" v-model="gol_darah" :options="options.golDarah" optionLabel="name" optionValue="code" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.gol_darah.$invalid" />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="pendidikan">Pendidikan</label>
										<InputText disabled id="pendidikan" v-model="pendidikan" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.pendidikan.$invalid" />
									</div>

									<Divider class="col-span-12" />
									<div class="col-span-12 mb-2">
										<h3 class="text-lg font-semibold">Kontak</h3>
									</div>
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="email">Email</label>
										<InputText disabled id="email" v-model="email" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.email.$invalid" />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="no_telp">Nomor Telpon</label>
										<InputText disabled id="no_telp" :useGrouping="false" fluid v-model="no_telp" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.no_telp.$invalid" />
									</div>
									
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="kontak_darurat">Kontak Darurat</label>
										<InputText disabled id="kontak_darurat" :useGrouping="false" fluid v-model="kontak_darurat" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.kontak_darurat.$invalid" />
									</div>

									<Divider class="col-span-12" />
									<div class="col-span-12 mb-2">
										<h3 class="text-lg font-semibold">Informasi Pekerjaan</h3>
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="rekening">Rekening</label>
										<InputText disabled id="rekening" v-model="rekening" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.rekening.$invalid" />
									</div>
									
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="mulai_kerja">Mulai Kerja</label>
										<DatePicker disabled inputId="mulai_kerja" v-model="mulai_kerja" dateFormat="dd-mm-yy" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.mulai_kerja.$invalid" />
									</div>
									
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="jabatan">Jabatan</label>
										<InputText disabled id="jabatan" v-model="jabatan" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.jabatan.$invalid" />
									</div>

									<div class="col-span-12 flex gap-2">
										<Button type="button" label="Simpan Perubahan" class="px-14 py-3" :loading="btnIsLoading" @click="editPegawai(id_pegawai)"></Button>
									</div>
								</form>
							</TabPanel>

							<TabPanel value="1">
								<form class="w-full grid grid-cols-12 gap-2">
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="email">Email</label>
										<InputTextid v-model="email" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.email.$invalid" />
									</div>
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="password">Password</label>
										<InputTextid v-model="password" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.password.$invalid" />
									</div>
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
										<label class="max-h-6 col-span-12" for="password_confirm">Konfirmasi Password</label>
										<InputTextid v-model="password_confirm" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.password_confirm.$invalid" />
									</div>

									<!-- CP itu Change Password  -->
									<div class="col-span-12">
										<Button label="Kirim" class="px-14 py-3" :loading="btnCPIsLoading" @click="kirim" />
									</div>
								</form>
							</TabPanel>
						</TabPanels>
					</Tabs>

				</div>
			</template>
		</Card>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
	name:'Profile',
	inject:['default'],
	data() {
		return {
			isAdmin: 0,
			authStore: useAuthStore(),
			isLoading: true,
			user: useAuthStore().authUser,
			editPegawaiData: [],
			avatar: '',
            // Validation
            v$: useVuelidate(),
            hasValidated: false,
            // Form
            no: 1,
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
		// async getPegawaiById(id) {
		// 	await axios.get(`pegawai/${id}`, {
		// 	}).then((res) => {
		// 		const response = res.data.data
		// 		console.log(response)
		// 		this.editPegawaiData = response

        //         this.id_pegawai      = id
        //         this.nama_lengkap    = response.nama_lengkap
        //         this.email           = response.email
        //         this.nik             = response.nik
        //         this.tgl_lahir       = response.tgl_lahir
        //         this.tempat_lahir    = response.tempat_lahir
        //         this.jk              = response.jk
        //         this.agama           = response.agama
        //         this.gol_darah       = response.gol_darah
        //         this.pendidikan      = response.pendidikan
        //         this.kontak_darurat  = response.kontak_darurat
        //         this.mulai_kerja     = response.mulai_kerja
        //         this.jabatan         = response.jabatan
        //         this.alamat          = response.alamat
        //         this.no_telp         = response.no_telp
        //         this.rekening        = response.rekening
		// 	})
		// },
		async getUser() {
			await axios.get('user', {
				headers: {'Authorization': `Bearer ${localStorage.getItem('token')}` }
			}).then((res) => {
				const mainData = res.data.data
				this.user = mainData
				console.log(res.data.data.pegawai)
				this.isAdmin    = mainData.is_admin ? true : false 

                this.nama_lengkap    = mainData.pegawai.nama_lengkap
                this.email           = mainData.pegawai.email
                this.nik             = mainData.pegawai.nik
                this.tgl_lahir       = mainData.pegawai.tgl_lahir
                this.tempat_lahir    = mainData.pegawai.tempat_lahir
                this.jk              = mainData.pegawai.jk
                this.agama           = mainData.pegawai.agama
                this.gol_darah       = mainData.pegawai.gol_darah
                this.pendidikan      = mainData.pegawai.pendidikan
                this.kontak_darurat  = mainData.pegawai.kontak_darurat
                this.mulai_kerja     = mainData.pegawai.mulai_kerja
                this.jabatan         = mainData.pegawai.jabatan
                this.alamat          = mainData.pegawai.alamat
                this.no_telp         = mainData.pegawai.no_telp
                this.rekening        = mainData.pegawai.rekening
				// Avatar If null
				mainData.avatar == null ? this.avatar = '/src/assets/app-logo.png' : this.avatar = (mainData.avatar)
				// console.log(mainData)
				this.isLoading = false
			}).catch((err) => {
				console.log(err)
			})
		},
	},
	mounted() {
		// getPegawai(this.$route.params.id)
		this.isAdmin ? this.getUser() : this.isLoading = false
		this.getUser()
	},
}
</script>

<style>
.p-tabpanels{
	padding: 0;
}
</style>
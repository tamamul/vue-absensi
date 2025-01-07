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
								<form class="w-full grid grid-cols-12 gap-5">
									<div class="col-span-12 mb-2 mt-5 ">
										<small>Ganti Data Pribadi Silahkan Hubungi Admin HRD</small>
										<h3 class="text-lg font-semibold">Informasi Pribadi</h3>
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="nama_lengkap">Nama Lengkap</label>
										<p>{{nama_lengkap}}</p>
										<Divider />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="nik">NIK</label>
										<p>{{nik}}</p>
										<Divider />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="tempat_lahir">Tempat Lahir</label>
										<p>{{tempat_lahir}}</p>
										<Divider />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="tgl_lahir">Tanggal Lahir</label>
										<p>{{tgl_lahir}}</p>
										<Divider />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="alamat">Alamat</label>
										<p>{{alamat}}</p>
										<Divider />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="jk">Jenis Kelamin</label>
										<p>{{jk}}</p>
										<Divider />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="agama">Agama</label>
										<p>{{agama}}</p>
										<Divider />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="gol_darah">Golongan Darah</label>
										<p>{{gol_darah}}</p>
										<Divider />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="pendidikan">Pendidikan</label>
										<p>{{pendidikan}}</p>
										<Divider />
									</div>

									<Divider class="col-span-12" />
									<div class="col-span-12 mb-2">
										<h3 class="text-lg font-semibold">Kontak</h3>
									</div>
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="email">Email</label>
										<p>{{email}}</p>
										<Divider />
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="no_telp">Nomor Telpon</label>
										<p>{{no_telp}}</p>
										<Divider />
									</div>
									
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="kontak_darurat">Kontak Darurat</label>
										<p>{{kontak_darurat}}</p>
										<Divider />
									</div>

									<Divider class="col-span-12" />
									<div class="col-span-12 mb-2">
										<h3 class="text-lg font-semibold">Informasi Pekerjaan</h3>
									</div>

									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="rekening">Rekening</label>
										<p>{{rekening}}</p>
										<Divider />
									</div>
									
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="mulai_kerja">Mulai Kerja</label>
										<p>{{mulai_kerja}}</p>
										<Divider />
									</div>
									
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="jabatan">Jabatan</label>
										<p>{{jabatan}}</p>
										<Divider />
									</div>
								</form>
							</TabPanel>

							<TabPanel value="1">
								<form class="w-full grid grid-cols-12 gap-2">
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="email">Email</label>
										<p>{{email}}</p>
										<Divider />
									</div>
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="password">Password</label>
										<p>{{password}}</p>
										<Divider />
									</div>
									<div class="col-span-12 lg:col-span-6 xl:col-span-4 gap-1 justify-end">
										<label class="font-semibold" for="password_confirm">Konfirmasi Password</label>
										<p>{{password_confirm}}</p>
										<Divider />
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
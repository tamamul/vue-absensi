<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>

	<div class="grid grid-cols-12 m-5" v-else>
		<Card class="col-span-12 shadow-md">
			<template #title>
				<h2 class="mb-5">
					User Profile
				</h2>
			</template>
			<template #content>
				<div class="flex flex-col gap-5">
					<div class="grid grid-cols-12">
						<div class="col-span-6 flex items-center gap-3">
							<Image :src="avatar" :alt="user.nama_lengkap" class="w-32 border border-white shadow-md items-center justify-center rounded-full" />
							<div>
								<p class="text-xl font-bold">{{ user.nama_lengkap ?? 'Muh. Mahatma Arrayyan' }}</p>
								<p class="text-xl">{{ user.jabatan ?? 'Frontend Dev' }}</p>
								<p class="text-base font-light">{{ user.alamat ?? 'Jl. Pendidikan Blok B5 No.08' }}</p>
							</div>
						</div>
						<div class="col-span-6 flex items-center gap-3 justify-center">
							<Button label="Upload New Photo" class="py-3 px-4"></Button>
							<Button label="Delete" class="py-3 px-4" outlined severity="danger"></Button>
						</div>
					</div>

					<Divider />

					<form class="w-full grid grid-cols-12 gap-2">
						<div class="col-span-12 mb-2">
							<h3 class="text-lg font-semibold ">Informasi Pribadi</h3>
						</div>
						<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
							<label class="max-h-6 col-span-12" for="nama_lengkap">Nama Lengkap <span class="text-red-500">*</span></label>
							<InputText id="nama_lengkap" v-model="nama_lengkap" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.nama_lengkap.$invalid" />
							<small v-if="hasValidated && v$.nama_lengkap.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
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
							<label class="max-h-6 col-span-12" for="pendidikan">Pendidikan <span class="text-red-500">*</span></label>
							<InputText id="pendidikan" v-model="pendidikan" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.pendidikan.$invalid" />
							<small v-if="hasValidated && v$.pendidikan.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
							<small v-else class="invisible">...</small>
						</div>

						<Divider class="col-span-12" />
						<div class="col-span-12 mb-2">
							<h3 class="text-lg font-semibold">Kontak</h3>
						</div>
						<div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end">
							<label class="max-h-6 col-span-12" for="email">Email <span class="text-red-500">*</span></label>
							<InputText id="email" v-model="email" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.email.$invalid" />
							<small v-if="hasValidated && v$.email.$error" class="text-red-500 col-span-12">Wajib Diisi</small>
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

						<Divider class="col-span-12" />
						<div class="col-span-12 mb-2">
							<h3 class="text-lg font-semibold">Informasi Pekerjaan</h3>
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

						<div class="col-span-12 flex justify-end gap-2">
							<Button type="button" label="Cancel" severity="secondary" @click="close"></Button>
							<Button type="button" label="Edit" :loading="btnIsLoading" @click="editPegawai(id_pegawai)"></Button>
						</div>
					</form>

				</div>
			</template>
		</Card>
	</div>
</template>

<script>
export default {
	name:'Profile',
	inject:['default'],
	data() {
		return {
			isLoading: true,
			user: [],
			avatar: '',
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
		async getUser() {
			await axios.get('user', {
				headers: {'Authorization': `Bearer ${localStorage.getItem('token')}` }
			}).then((res) => {
				const mainData = res.data.data
				this.user = (mainData)
				// Avatar If null
				mainData.avatar == null ? this.avatar = '/src/assets/app-logo.png' : this.avatar = (mainData.avatar)
				console.log(mainData)
				this.isLoading = false
			}).catch((err) => {
				console.log(err)
			})
		},
	},
	async mounted() {
		await this.getUser()
	},
}
</script>
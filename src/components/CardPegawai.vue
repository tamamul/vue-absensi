<template>
	<Card class="shadow-md col-span-12">
		<template #title>Tambah Pegawai</template>
		<template #content>
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

					<div>{{ tgl_lahir }}</div>
				</div>

			</form>
		</template>
	</Card>
</template>

<script>
export default {
	name:'CardPegawai',
	inject:['default'],
	emits:[
		'funPegawai',
	],
	props: {
        nama_lengkap: String,
        email: String,
        nik: String,
        tgl_lahir: String,
        tempat_lahir: String,
        jk: String,
        agama: String,
        gol_darah: String,
        pendidikan: String,
        kontak_darurat: String,
        mulai_kerja: String,
        jabatan: String,
        alamat: String,
        no_telp: String,
        rekening: String
    },
	data() {
		return {
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
		}
	},
	methods: {
		formattedDate(date) {
            if (date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            return '';
        },
	},
	mounted() {
	},
}
</script>
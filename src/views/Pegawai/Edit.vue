<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>

    <div class="grid grid-cols-12 gap-5 m-5" v-else>
        <!-- <CardPegawai
            @funPegawai         = "editPegawai"
            :nama_lengkap       = "nama_lengkap"
            :email              = "email"
            :nik                = "nik"
            :tgl_lahir          = "tgl_lahir"
            :tempat_lahir       = "tempat_lahir"
            :jk                 = "jk"
            :agama              = "agama"
            :gol_darah          = "gol_darah"
            :pendidikan         = "pendidikan"
            :kontak_darurat     = "kontak_darurat"
            :mulai_kerja        = "mulai_kerja"
            :jabatan            = "jabatan"
            :alamat             = "alamat"
            :no_telp            = "no_telp"
            :rekening           = "rekening"
        ></CardPegawai> -->
        <Card class="shadow-md col-span-12">
            <template #title>Edit Pegawai {{ pegawai.nama_lengkap }}</template>
            <template #content>
                <form class="flex flex-col w-full gap-4">

                    <div class="grid grid-cols-12 gap-4">

                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="nama_lengkap">Nama Lengkap <span class="text-red-500">*</span></label>
                            <InputText id="nama_lengkap" v-model="pegawai.nama_lengkap" class="col-span-12" />
                        </div>

                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="email">Email <span class="text-red-500">*</span></label>
                            <InputText id="email" v-model="pegawai.email" class="col-span-12" />
                        </div>

                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="nik">NIK <span class="text-red-500">*</span></label>
                            <InputText v-model="pegawai.nik" id="nik" :useGrouping="false" fluid class="col-span-12" />
                        </div>

                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="tempat_lahir">Tempat Lahir <span class="text-red-500">*</span></label>
                            <InputText id="tempat_lahir" v-model="pegawai.tempat_lahir" class="col-span-12" />
                        </div>

                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="tgl_lahir">Tanggal Lahir <span class="text-red-500">*</span></label>
                            <DatePicker inputId="tgl_lahir" v-model="pegawai.tgl_lahir" Date dateFormat="yy-mm-dd" class="col-span-12" />
                        </div>

                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="alamat">Alamat <span class="text-red-500">*</span></label>
                            <InputText id="alamat" v-model="pegawai.alamat" class="col-span-12" />
                        </div>

                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="jk">Jenis Kelamin <span class="text-red-500">*</span></label>
                            <Select inputId="jk" v-model="pegawai.jk" :options="formJenisKelamin" optionLabel="name" optionValue="code" class="col-span-12" />
                        </div>
                        
                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="agama">Agama <span class="text-red-500">*</span></label>
                            <Select inputId="agama" v-model="pegawai.agama" :options="formAgama" optionLabel="name" optionValue="code" class="col-span-12" />
                        </div>
                        
                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="gol_darah">Golongan Darah <span class="text-red-500">*</span></label>
                            <Select inputId="gol_darah" v-model="pegawai.gol_darah" :options="formGolDarah" optionLabel="name" optionValue="code" class="col-span-12" />
                        </div>

                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="no_telp">Nomor Telpon <span class="text-red-500">*</span></label>
                            <InputText id="no_telp" :useGrouping="false" fluid v-model="pegawai.no_telp" class="col-span-12" />
                        </div>
                        
                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="kontak_darurat">Kontak Darurat <span class="text-red-500">*</span></label>
                            <InputText id="kontak_darurat" :useGrouping="false" fluid v-model="pegawai.kontak_darurat" class="col-span-12" />
                        </div>

                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="rekening">Rekening <span class="text-red-500">*</span></label>
                            <InputText id="rekening" v-model="pegawai.rekening" class="col-span-12" />
                        </div>
                        
                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="mulai_kerja">Mulai Kerja <span class="text-red-500">*</span></label>
                            <DatePicker inputId="mulai_kerja" v-model="pegawai.mulai_kerja" dateFormat="dd-mm-yy" class="col-span-12" />
                        </div>
                        
                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="jabatan">Jabatan <span class="text-red-500">*</span></label>
                            <InputText id="jabatan" v-model="pegawai.jabatan" class="col-span-12" />
                        </div>

                        <div class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="pendidikan">Pendidikan <span class="text-red-500">*</span></label>
                            <InputText id="pendidikan" v-model="pegawai.pendidikan" class="col-span-12" />
                        </div>

                        <div class="col-span-12 justify-end gap-2">
                            <div class="flex gap-3">
                                <Button type="button" label="Save" @click="editPegawai"></Button>
                            </div>
                        </div>

                    </div>

                </form>
            </template>
        </Card>
    </div>

</template>

<script>
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

export default {
    name: 'EditPegawai',
    data() {
        return {
            authStore: useAuthStore(),
            isLoading: true,
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
            // the form
			pegawai: []
        }
    },
    methods: {
		formattedDate(date) {
			if (typeof date === 'string') {
				date = new Date(date); // Convert string to Date object
			}
			
			if (date instanceof Date && !isNaN(date)) { // Check if it's a valid Date object
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				return `${year}-${month}-${day}`;
			}
			return '';
		},
		async getPegawai(id){
			await axios.get(`pegawai/${id}`, {
				headers:{
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}).then((res) => {
				console.log(res.data.data)
				this.isLoading = false
				this.pegawai = res.data.data
			}).catch((err) => {
				console.log(err)
                console.log(localStorage.getItem('token'));
			})
		},
        async editPegawai() {
            const data = {
                nama_lengkap    : this.pegawai.nama_lengkap,
                email           : this.pegawai.email,
                nik             : this.pegawai.nik,
                tgl_lahir       : this.formattedDate(this.pegawai.tgl_lahir),
                tempat_lahir    : this.pegawai.tempat_lahir,
                jk              : this.pegawai.jk,
                agama           : this.pegawai.agama,
                gol_darah       : this.pegawai.gol_darah,
                pendidikan      : this.pegawai.pendidikan,
                kontak_darurat  : this.pegawai.kontak_darurat,
                mulai_kerja     : this.formattedDate(this.pegawai.mulai_kerja),
                jabatan         : this.pegawai.jabatan,
                alamat          : this.pegawai.alamat,
                no_telp         : this.pegawai.no_telp,
                rekening        : this.pegawai.rekening,
            }
            await axios.put('pegawai', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                console.log(res.data);
            }).catch((err) =>{
                console.log('Error'+err);
                console.log(err);
                console.log(localStorage.getItem('token'));
            })
        }
    },
	mounted() {
		this.getPegawai(this.$route.params.id);
	},
}
</script>

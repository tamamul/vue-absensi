<template>
    <div class="grid grid-cols-12 gap-5 m-5" v-if="isLoading">
        <Skeleton class="col-span-12" width="100%" height="80vh"></Skeleton>
    </div>

    <div class="grid grid-cols-12 gap-5 m-5" v-else>
        <Card class="shadow-md col-span-12">
            <template #title>Tambah Pegawai</template>
            <template #content>
                <form class="flex flex-col w-full gap-4">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="nama">Nama <span class="text-red-500">*</span></label>
                            <InputText id="nama" v-model="nama" class="col-span-12" />
                        </div>
    
                        <div class="col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="email">Email <span class="text-red-500">*</span></label>
                            <InputText id="email" v-model="email" class="col-span-12" />
                        </div>
    
                        <div class="col-span-4 grid grid-cols-12 gap-1">
                            <label class="col-span-12" for="nik">NIK <span class="text-red-500">*</span></label>
                            <InputText id="nik" v-model="nik" class="col-span-12" />
                        </div>

                        <div class="col-span-6 grid grid-cols-12 gap-1">       
                            <div class="col-span-12 grid grid-cols-12 gap-1">
                                <label class="col-span-12" for="tgl_lahir">Tanggal Lahir <span class="text-red-500">*</span></label>
                                <InputText id="tgl_lahir" v-model="tgl_lahir" class="col-span-12" />
                            </div>

                            <div class="col-span-12 grid grid-cols-12 gap-1">
                                <label class="col-span-12" for="jk">Jenis Kelamin <span class="text-red-500">*</span></label>
                                <InputText id="jk" v-model="jk" class="col-span-12" />
                            </div>

                            <div class="col-span-12 grid grid-cols-12 gap-1">
                                <label class="col-span-12" for="agama">Agama <span class="text-red-500">*</span></label>
                                <InputText id="agama" v-model="agama" class="col-span-12" />
                            </div>

                            <div class="col-span-12 grid grid-cols-12 gap-1">
                                <label class="col-span-12" for="gol_darah">Golongan Darah <span class="text-red-500">*</span></label>
                                <InputText id="gol_darah" v-model="gol_darah" class="col-span-12" />
                            </div>

                            <div class="col-span-12 grid grid-cols-12 gap-1">
                                <label class="col-span-12" for="pendidikan">Pendidikan <span class="text-red-500">*</span></label>
                                <InputText id="pendidikan" v-model="pendidikan" class="col-span-12" />
                            </div>

                            <div class="col-span-12 grid grid-cols-12 gap-1">
                                <label class="col-span-12" for="kontak_darurat">Kontak Darurat <span class="text-red-500">*</span></label>
                                <InputText id="kontak_darurat" v-model="kontak_darurat" class="col-span-12" />
                            </div>
                        </div>

                        <div class="col-span-6 grid grid-cols-12 gap-1">
                            <div class="col-span-12 grid grid-cols-12 gap-1">
                                <label class="col-span-12" for="mulai_kerja">Mulai Kerja <span class="text-red-500">*</span></label>
                                <InputText id="mulai_kerja" v-model="mulai_kerja" class="col-span-12" />
                            </div>

                            <div class="col-span-12 grid grid-cols-12 gap-1">
                                <label class="col-span-12" for="jabatan">Jabatan <span class="text-red-500">*</span></label>
                                <InputText id="jabatan" v-model="jabatan" class="col-span-12" />
                            </div>

                            <div class="col-span-12 grid grid-cols-12 gap-1">
                                <label class="col-span-12" for="alamat">Alamat <span class="text-red-500">*</span></label>
                                <InputText id="alamat" v-model="alamat" class="col-span-12" />
                            </div>

                            <div class="col-span-12 grid grid-cols-12 gap-1">
                                <label class="col-span-12" for="no_telp">Nomor Telpon <span class="text-red-500">*</span></label>
                                <InputText id="no_telp" v-model="no_telp" class="col-span-12" />
                            </div>

                            <div class="col-span-12 grid grid-cols-12 gap-1">
                                <label class="col-span-12" for="rekening">Rekening <span class="text-red-500">*</span></label>
                                <InputText id="rekening" v-model="rekening" class="col-span-12" />
                            </div>
                            <div class="col-span-12 grid grid-cols-12 gap-1">
                            </div>
                        </div>
                    </div>

                    <div class="justify-end gap-2">
                        <div class="flex gap-3">
                            <Button type="button" label="Save" @click="postPegawai"></Button>
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
    name: 'TambahPegawai',
    data() {
        return {
            authStore: useAuthStore(),
            isLoading: false,
            // the form
            nama            : '',
            email           : '',
            nik             : '',
            tgl_lahir       : '',
            jk              : '',
            agama           : '',
            gol_darah       : '',
            pendidikan      : '',
            kontak_darurat  : '',
            mulai_kerja     : '',
            jabatan         : '',
            alamat          : '',
            no_telp         : '',
            rekening        : '',
        }
    },
    methods: {
        async postPegawai() {
            const data = {
                nama            : this.nama,
                email           : this.email,
                nik             : this.nik,
                tgl_lahir       : this.tgl_lahir,
                jk              : this.jk,
                agama           : this.agama,
                gol_darah       : this.gol_darah,
                pendidikan      : this.pendidikan,
                kontak_darurat  : this.kontak_darurat,
                mulai_kerja     : this.mulai_kerja,
                jabatan         : this.jabatan,
                alamat          : this.alamat,
                no_telp         : this.no_telp,
                rekening        : this.rekening,
            }
            await axios.post('pegawai', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
                console.log(localStorage.getItem('token'))
            })
        }
    },
}
</script>

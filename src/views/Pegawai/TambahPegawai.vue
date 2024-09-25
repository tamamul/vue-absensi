<template>
    <div class="grid grid-cols-12 gap-5 m-5" v-if="isLoading">

    </div>

    <div class="grid grid-cols-12 gap-5 m-5" v-else>
        <div  class="shadow-md col-span-12 lg:col-span-12 xl:col-span-12">
            <input type="text" v-model="formEmployees.nama">
            <input type="text" v-model="formEmployees.alamat">
            <input type="text" v-model="formEmployees.no_telp">
            <input type="text" v-model="formEmployees.no_telp_darurat">
            <input type="text" v-model="formEmployees.tanggal_lahir">
        </div>
        <Card class="shadow-md col-span-12">
            <template #title>Tambah Pegawai</template>
            <template #content>
                <form class="flex flex-col w-full gap-4">
                    <div class="grid grid-cols-12 items-center">
                        <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="nama">Nama <span class="text-red-500">*</span></label>
                        <InputText id="nama" v-model="formEmployees.nama" class="col-span-12 lg:col-span-12 xl:col-span-9" />
                    </div>

                    <div class="grid grid-cols-12 items-center">
                        <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="alamat">Alamat <span class="text-red-500">*</span></label>
                        <InputText id="alamat" v-model="formEmployees.alamat" class="col-span-12 lg:col-span-12 xl:col-span-9" />
                    </div>

                    <div class="grid grid-cols-12 items-center">
                        <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="tanggal_lahir">Tanggal Lahir <span class="text-red-500">*</span></label>
                        <DatePicker v-model="formEmployees.tanggal_lahir" inputId="tanggal_lahir" dateFormat="dd/mm/yy" class="col-span-12 lg:col-span-12 xl:col-span-9" />
                    </div>

                    <div class="grid grid-cols-12 items-center">
                        <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="no_telp">Nomor Telpon <span class="text-red-500">*</span></label>
                        <InputNumber id="no_telp" v-model="formEmployees.no_telp" inputId="withoutgrouping" :useGrouping="false" placeholder="08x..." class="col-span-12 lg:col-span-12 xl:col-span-9" />
                    </div>

                    <div class="grid grid-cols-12 items-center">
                        <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="no_telp_darurat">Nomor Telpon (Darurat) <span class="text-red-500">*</span></label>
                        <InputNumber id="no_telp_darurat" v-model="formEmployees.no_telp_darurat" inputId="withoutgrouping" :useGrouping="false" placeholder="08x..." class="col-span-12 lg:col-span-12 xl:col-span-9" />
                    </div>

                    <div class=" justify-end gap-2">
                        <div class="flex gap-3">
                            <Button type="button" label="Save" @click="postEmployees"></Button>
                        </div>
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';


export default {
    name: 'TambahPegawai',
    inject: ['default'],
    data() {
        return {
            authStore: useAuthStore(),

            formEmployees : {
                nama            : '',
                alamat          : '',
                tanggal_lahir   : '',
                no_telp         : null,
                no_telp_darurat : null,
            },
            isLoading: true
        }
    },
    methods: {
        async postEmployees() {
            try {
                const response = await fetch("http://localhost:3000/pegawai", {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(this.formEmployees)
                });

                this.formEmployees = {
                    nama            : '',
                    alamat          : '',
                    tanggal_lahir   : '',
                    no_telp         : null,
                    no_telp_darurat : null,
                };

                this.getEmployees();

                // const data = await response.json();
                this.$toast.add({ severity: 'success', summary: 'Update', detail: 'Data berhasil di update', life: 5000 });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
                this.$toast.add({ severity: 'error', summary: 'Update Gagal', detail: 'Network response was not ok', life: 5000 });
            }
        }
    },
    async mounted() {
    },
}
</script>

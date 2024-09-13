<template>
    <Layout>
        <div  class="shadow-md col-span-12 lg:col-span-12 xl:col-span-12">
            <input type="text" v-model="formEmployees.nama">
            <input type="text" v-model="formEmployees.alamat">
            <input type="text" v-model="formEmployees.no_telp">
            <input type="text" v-model="formEmployees.no_telp_darurat">
            <input type="text" v-model="formEmployees.tanggal_lahir">
        </div>
        <Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-6">
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

        <Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-12">
            <template #title>Daftar Pegawai</template>
            <template #content>
                <DataTable :value="employees" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem">
                    <Column field="id" header="No"></Column>
                    <!-- <Column field="foto" header="Foto"></Column> -->
                    <Column field="nama" header="Nama"></Column>
                    <Column field="tanggal_lahir" header="Tanggal Lahir"></Column>
                    <Column field="alamat" header="Alamat"></Column>
                    <Column field="no_telp" header="No. Telepon"></Column>
                    <Column field="no_telp_darurat" header="No. Telepon Darurat"></Column>
                    <Column header="Action">
                        <Button icon="pi pi-bell" severity="warn" aria-label="Notification" />
                    </Column>
                </DataTable>
            </template>
        </Card>
    </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';

export default {
  components: { Layout },
    data() {
        return {
            // ? Empty array for employees
            employees: [],

            // ? vmodel untuk input
            formEmployees : {
                nama            : '',
                alamat          : '',
                tanggal_lahir   : '',
                no_telp         : null,
                no_telp_darurat : null,
            }
        }
    },
    methods: {
        getAxiosEmployees() {
            axios.get('employees')
                .then((res) => {
                    this.employees = res.data;
                })
                .catch((err) => {
                    console.log("Error:" + err);
                })
        },
        async postEmployees() {
            try {
                const response = await fetch("http://localhost:3000/employees", {
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
        this.getAxiosEmployees()
    },
}
</script>

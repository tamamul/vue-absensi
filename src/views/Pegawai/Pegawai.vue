
<template>
    <Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-6">
        <template #title>Tambah Pegawai</template>
        <template #content>
            <form class="flex flex-col w-full gap-4">
                <div class="grid grid-cols-12 items-center">
                    <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="nama">Nama</label>
                    <InputText id="nama" v-model="formEmployees.nama" class="col-span-12 lg:col-span-12 xl:col-span-9" />
                </div>

                <div class="grid grid-cols-12 items-center">
                    <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="alamat">Alamat</label>
                    <InputText id="alamat" v-model="formEmployees.alamat" class="col-span-12 lg:col-span-12 xl:col-span-9" />
                </div>

                <div class="grid grid-cols-12 items-center">
                    <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="tanggal_lahir">Tanggal Lahir</label>
                    <DatePicker v-model="formEmployees.tanggal_lahir" inputId="tanggal_lahir" class="col-span-12 lg:col-span-12 xl:col-span-9" />
                </div>

                <div class="grid grid-cols-12 items-center">
                    <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="ssn">Nomor Telpon (Darurat)</label>
                    <InputMask id="ssn" v-model="formEmployees.no_telp" mask="9999-9999-9999" placeholder="628*-****-****" class="col-span-12 lg:col-span-12 xl:col-span-9" />
                </div>

                <div class="grid grid-cols-12 items-center">
                    <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="profile">Photo Profile</label>
                    <!-- <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true" chooseLabel="Browse" class="w-full col-span-12 lg:col-span-12 xl:col-span-9" /> -->
                </div>

                <div class=" justify-end gap-2">
                    <div class="flex gap-3">
                        <Button type="button" label="Save" @click="postEmployees"></Button>
                    </div>
                </div>
            </form>
        </template>
    </Card>

    <Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-6">
        <template #title>vmodelnya</template>
        <template #content>
            {{formEmployees.nama}}
            {{formEmployees.alamat}}
            {{formEmployees.tanggal_lahir}}
            {{formEmployees.no_telp}}
        </template>
    </Card>

    <Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-12">
        <template #title>Daftar Pegawai</template>
        <template #content>
            <DataTable :value="employees" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem">
                <Column field="id" header="Code"></Column>
                <Column field="foto" header="Foto"></Column>
                <Column field="nama" header="Nama"></Column>
                <Column field="no_telp" header="No. Telepon"></Column>
                <Column field="alamat" header="Alamat"></Column>
                <Column field="tanggal_lahir" header="Tanggal Lahir"></Column>
            </DataTable>
        </template>
    </Card>
</template>

<script>

export default {
    data() {
        return {
            // ? Empty array for employees
            employees: [],

            // ? vmodel untuk input
            formEmployees : {
                nama            : '',
                alamat          : '',
                tanggal_lahir   : '',
                no_telp         : '',
            }
        }
    },
    methods: {
        async getEmployees() {
            const response = await fetch("http://localhost:3000/employees");
            const data = await response.json()
            console.log(data)
            this.employees = (data)
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
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    // const data = await response.json();
                    this.$toast.add({ severity: 'success', summary: 'Update', detail: 'Data berhasil di update', life: 3000 });
            } catch (error) {
                console.error('Error:', error);
                this.$toast.add({ severity: 'error', summary: 'Update Gagal', detail: 'Network response was not ok', life: 3000 });
            }
        }
    },
    mounted() {
        this.getEmployees()
    },
}
</script>


<template>
    <Card class="shadow-md col-span-12 lg:col-span-12 xl:col-span-6">
        <template #title>Tambah Pegawai</template>
        <template #content>
            <form action="POST" class="flex flex-col w-full gap-4">
                <div class="grid grid-cols-12 items-center">
                    <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="nama">Nama</label>
                    <InputText id="nama" v-model="value" class="col-span-12 lg:col-span-12 xl:col-span-9" />
                </div>

                <div class="grid grid-cols-12 items-center">
                    <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="alamat">Alamat</label>
                    <InputText id="alamat" v-model="value" class="col-span-12 lg:col-span-12 xl:col-span-9" />
                </div>

                <div class="grid grid-cols-12 items-center">
                    <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="tanggal_lahir">Tanggal Lahir</label>
                    <DatePicker v-model="date" inputId="tanggal_lahir" class="col-span-12 lg:col-span-12 xl:col-span-9" />
                </div>

                <div class="grid grid-cols-12 items-center">
                    <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="ssn">Nomor Telpon (Darurat)</label>
                    <InputMask id="ssn" v-model="value" mask="9999-9999-9999" placeholder="628*-****-****" class="col-span-12 lg:col-span-12 xl:col-span-9" />
                </div>

                <div class="grid grid-cols-12 items-center">
                    <label class="col-span-12 lg:col-span-12 xl:col-span-3" for="profile">Photo Profile</label>
                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true" chooseLabel="Browse" class="w-full col-span-12 lg:col-span-12 xl:col-span-9" />
                </div>
            </form>
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
            employees: []
        }
    },
    methods: {
        getEmployees() {
            const fetchEmployees = async () => {
                const endpoint = await fetch("http://localhost:3000/employees");
                const data = await endpoint.json()
                console.log(data)
                this.employees = (data)
            }

            fetchEmployees()
        }
    },
    mounted() {
        this.getEmployees()
    },
}
</script>

<template>
    <Card class="col-span-12 xl:col-span-8 shadow-md">
        <template #title>
            <div class="flex justify-between">
                <h3>Jadwal Pegawai</h3>
                <div class="flex gap-2">
                    <Button
                        icon="pi pi-plus-circle"
                        label="Tambah"
                        @click="openPost()"
                    />
                </div>
            </div>
        </template>
        <template #content>
            <TableDefault
                :columns="columns"
                api="/jadwal/pegawai"
                id="id"
                :dataLuar="data"
                @openEdit="handleEdit"
                :deleteAble="false"
            />
        </template>
    </Card>

    <Dialog
        :visible="visible"
        modal
        :header="dialogTitle"
        :style="{ width: '40rem' }"
    >
        <span class="text-surface-500 dark:text-surface-400 block mb-8"
            >Pilih pegawai dan jadwal kerja yang ingin diedit.</span
        >
        <form class="">
            <InputVuelidate
                name="nama_lengkap"
                label="Pilih Pegawai"
                :hasValidated="hasValidated"
            >
                <Select
                    class="col-span-12 max-h-[46px]"
                    v-model="pegawai"
                    :options="daftarPegawai"
                    optionLabel="nama_lengkap"
                    :loading="loadingPegawai"
                    :placeholder="phPegawai"
                    filter
                ></Select>
            </InputVuelidate>
            <InputVuelidate
                name="nama_jadwal"
                label="Pilih Pegawai"
                :hasValidated="hasValidated"
            >
                <Select
                    class="col-span-12"
                    v-model="jadwalKerja"
                    :options="daftarJadwalkerja"
                    optionLabel="nama_jadwal"
                    :loading="loadingJadwalKerja"
                    :placeholder="phJadwalKerja"
                    filter
                ></Select>
            </InputVuelidate>
        </form>

        <div class="flex justify-end gap-2">
            <Button
                type="button"
                label="Cancel"
                severity="secondary"
                @click="toggleJadwalPegawai"
            ></Button>
            <Button type="button" label="Save" @click="post"></Button>
        </div>
    </Dialog>
</template>

<script>
export default {
    name: "CardJadwalPegawai",
    data() {
        return {
            // Table
            columns: [
                { field: "nama_pegawai", header: "Nama Pegawai" },
                { field: "jadwal.nama_jadwal", header: "Nama Jadwal" },
            ],
            visible: false,

            data: [],

            pegawai: null,
            daftarPegawai: null,
            phPegawai: "Loading...",
            loadingPegawai: true,

            jadwalKerja: null,
            daftarJadwalkerja: null,
            phJadwalKerja: "Loading...",
            loadingJadwalKerja: true,

            v$: useVuelidate(),
            hasValidated: false,

            dialogTitle: "",
        };
    },
    validations() {
        return {
            id_jadwal: { required },
            id_pegawai: { required },
        };
    },
    methods: {
        async getAllJadwal() {
            try {
                this.data = await getData("/jadwal/pegawai");
                this.isLoading = false;
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        },
        toggleJadwalPegawai() {
            this.visible = !this.visible;
        },
        handleEdit(id) {
            this.toggleJadwalPegawai();
            this.dialogTitle = "Edit Jadwal Pegawai";
            this.getPegawaiAll();
            this.getJadwalKerja();
        },
        openPost() {
            this.toggleJadwalPegawai();
            this.getJadwalKerja();
            this.getPegawaiAll();
            this.dialogTitle = "Tambah Jadwal Pegawai";
        },

        async post() {
            this.toggleJadwalPegawai();

            const data = {
                id_pegawai: this.pegawai.id_pegawai,
                id_jadwal: this.jadwalKerja.id_jadwal,
            };
            this.hasValidated = true;

            await axios
                .put("/jadwal/pegawai", data)
                .then((res) => {
                    this.$toast.add({
                        severity: "success",
                        summary: "Success",
                        detail: res.data.message,
                        life: 3000,
                    });
                    this.pegawai = null;
                    this.jadwalKerja = null;
                    this.getAllJadwal();
                })
                .catch((err) => {
                    console.log(err);
                    this.$toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: err,
                        life: 3000,
                    });
                });
        },

        async getPegawaiAll() {
            try {
                const res = await axios.get("pegawai");
                this.daftarPegawai = res.data.data;
                this.loadingPegawai = false;
                this.phPegawai = "Pilih pegawai";
            } catch (err) {
                console.log("Error:" + err);
                this.phPegawai = "Error";
                this.loadingPegawai = false;
            }
        },
        async getJadwalKerja() {
            await axios
                .get("jadwal")
                .then((res) => {
                    this.daftarJadwalkerja = res.data.data;
                    this.loadingJadwalKerja = false;
                    this.phJadwalKerja = "Pilih Jadwal Kerja";
                })
                .catch((err) => {
                    console.log("Error:" + err);
                    this.phJadwalKerja = "Error";
                });
        },
    },
    mounted() {
        this.getAllJadwal();
    },
};
</script>

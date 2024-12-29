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
                :cusAction = true
            >
                <Column
                    header="Action"
                    frozen
                    alignFrozen="right"
                    style="width: 100px"
                >
                    <template #body="slotProps">
                        <div class="flex gap-2 bg-white">
                            <Button
                                icon="pi pi-pencil"
                                severity="info"
                                aria-label="Edit"
                                @click="
                                    handleEdit(
                                        slotProps.data.id_pegawai,
                                        slotProps.data.jadwal.id_jadwal
                                    )
                                "
                            />
                        </div>
                    </template>
                </Column>
            </TableDefault>
        </template>
    </Card>

    <Dialog
        v-model:visible="visible"
        modal
        :header="dialogTitle"
        :style="{ width: '40rem' }"
    >
        <span class="text-surface-500 dark:text-surface-400 block mb-8"
            >Pilih pegawai dan jadwal kerja yang ingin diedit.</span
        >
        <div class="grid grid-cols-12 gap-5 h-40 m-5" v-if="formIsLoading">
            <div class="col-span-12 w-full flex justify-center items-center">
                <ProgressSpinner />
            </div>
        </div>
        <form class="" v-else>
            <InputVuelidate
                name="nama_lengkap"
                label="Pilih Pegawai"
                :hasValidated="hasValidated"
            >
                <Select
                    class="col-span-12 max-h-[46px]"
                    :disabled="isEdit"
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
                label="Pilih Jadwal Kerja"
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
            <div class="flex justify-end gap-2">
                <Button
                    type="button"
                    label="Cancel"
                    severity="secondary"
                    @click="toggleJadwalPegawai"
                ></Button>
                <Button type="button" label="Save" @click="post"></Button>
            </div>
        </form>
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
            isEdit: false,
            formIsLoading: false,
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
            if (this.visible === true) {
                this.loadingPegawai = true
                this.loadingJadwalKerja = true
            }
        },
        handleEdit(id_pegawai, id_jadwal) {
            this.toggleJadwalPegawai();
            this.dialogTitle = "Edit Jadwal Pegawai";
            this.getPegawaiAll();
            this.getJadwalKerja();
            this.isEdit = true;
            this.formIsLoading = false;
            this.getJadwalPegawaiById(id_jadwal, id_pegawai);
        },
        openPost() {
            this.isEdit = false;
            this.phPegawai = "Pilih pegawai";
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
        async getJadwalPegawaiById(id_jadwal, id_pegawai) {
            await axios
                .get("/jadwal/pegawai/detail", {
                    params: { id_jadwal, id_pegawai },
                })
                .then((res) => {
                    this.phPegawai = res.data.data.nama_pegawai;
                    this.formIsLoading = false;
                    this.pegawai = res.data.data;
                    this.jadwalKerja = res.data.data.jadwal;
                    this.phJadwalKerja = res.data.data.jadwal.nama_jadwal;
                })
                .catch((err) => {
                    console.log("Error:" + err);
                });
        },
    },
    mounted() {
        this.getAllJadwal();
    },
};
</script>

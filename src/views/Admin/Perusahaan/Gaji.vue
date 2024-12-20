<template>
    <div class="grid grid-cols-12 m-5 gap-5">
        <Card class="col-span-12 shadow-md">
            <template #title>
                <div class="flex justify-between">
                    <h3>Data Gaji Pokok Pegawai</h3>
                    <div class="flex gap-2">
                        <Button
                            icon="pi pi-plus-circle"
                            label="Tambah Gaji"
                            @click="openPost"
                        ></Button>
                        <Button
                            icon="pi pi-external-link"
                            label="Export"
                            @click="exportCSV($event)"
                        />
                    </div>
                </div>
            </template>
            <template #content>
                <TableDefault
                    :columns="columns"
                    @openDelete="handleDelete"
                    @openEdit="handleEdit"
                    api="/gaji"
                    :dataLuar="data"
                    id="id_gaji"
                />
            </template>
        </Card>

        <Dialog
            :visible="visibleGajiDialog"
            modal
            header="Tambah Gaji Pegawai"
            :style="{ width: '70rem' }"
        >
            <template #container>
                <div
                    class="grid grid-cols-12 gap-5 h-96 m-5"
                    v-if="formIsLoading"
                >
                    <div
                        class="col-span-12 w-full flex justify-center items-center"
                    >
                        <ProgressSpinner />
                    </div>
                </div>

                <div class="p-7 overflow-auto" v-else>
                    <form class="w-full grid grid-cols-12 gap-2">
                        <p class="col-span-12 text-xl mb-6 font-semibold">
                            {{ dialogTitle }}
                        </p>

                        <InputVuelidate
                            name="nama_lengkap"
                            label="Pilih Pegawai"
                            :hasValidated="hasValidated"
                        >
                            <Select
                                class="col-span-12 max-h-[46px]"
                                :disabled="!formPost"
                                v-model="pegawai"
                                :options="daftarPegawai"
                                optionLabel="nama_lengkap"
                                :loading="loadingPegawai"
                                :placeholder="phPegawai"
                                filter
                            ></Select>
                        </InputVuelidate>

                        <InputVuelidate
                            name="gaji_pokok"
                            label="Gaji Pokok"
                            :hasValidated="hasValidated"
                        >
                            <InputNumber
                                id="gaji_pokok"
                                v-model="gaji_pokok"
                                class="col-span-12 max-h-[46px]"
                                :invalid="hasValidated && v$.name.$invalid"
                                placeholder="Masukkan gaji pokok pegawai"
                            />
                        </InputVuelidate>

                        <InputVuelidate
                            name="tunjangan"
                            label="Tunjangan"
                            :hasValidated="hasValidated"
                        >
                            <InputNumber
                                id="tunjangan"
                                v-model="tunjangan"
                                class="col-span-12 max-h-[46px]"
                                :invalid="hasValidated && v$.name.$invalid"
                                placeholder="Masukkan tunjangan pegawai"
                            />
                        </InputVuelidate>

                        <InputVuelidate
                            name="rekening"
                            label="No Rekening"
                            :hasValidated="hasValidated"
                        >
                            <InputText
                                id="rekening"
                                v-model="rekening"
                                class="col-span-12 max-h-[46px]"
                                :invalid="hasValidated && v$.name.$invalid"
                                placeholder="Masukkan no rekening pegawai"
                            />
                        </InputVuelidate>

                        <InputVuelidate
                            name="nama_bank"
                            label="Nama Bank"
                            :hasValidated="hasValidated"
                        >
                            <InputText
                                id="nama_bank"
                                v-model="nama_bank"
                                class="col-span-12 max-h-[46px]"
                                :invalid="hasValidated && v$.name.$invalid"
                                placeholder="Masukkan nama bank pegawai"
                            />
                        </InputVuelidate>
                    </form>
                    <div class="flex justify-end gap-2">
                        <Button
                            type="button"
                            label="Cancel"
                            severity="secondary"
                            @click="toggleGajiDialog"
                        ></Button>
                        <Button
                            type="button"
                            label="Edit"
                            @click="edit(id_gaji)"
                            v-if="id_gaji"
                        ></Button>
                        <Button
                            type="button"
                            label="Tambahkan"
                            @click="post"
                            v-else
                        ></Button>
                    </div>
                </div>
            </template>
        </Dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isLoading: true,
            idGaji: null,
            visibleGajiDialog: false,
            columns: [
                { field: "nama_pegawai", header: "Nama Pegawai" },
                { field: "gaji_pokok", header: "Gaji Pokok" },
                { field: "tunjangan", header: "Tunjangan" },
                { field: "nama_bank", header: "Nama Bank" },
                { field: "rekening", header: "No. Rekening" },
            ],
            data: [],

            pegawai: null,
            daftarPegawai: null,
            phPegawai: "Loading...",
            loadingPegawai: true,

            v$: useVuelidate(),
            hasValidated: false,
            formPost: false,

            id_gaji: null,
            pegawai: null,
            gaji_pokok: null,
            tunjangan: null,
            rekening: "",
            nama_bank: "",

            formIsLoading: false,

            dialogTitle: "",
        };
    },
    validations() {
        return {
            id_pegawai: { required },
            gaji_pokok: { required },
            tunjangan: { required },
            nama_bank: { required },
            rekening: { required },
        };
    },
    methods: {
        toggleGajiDialog() {
            this.visibleGajiDialog = !this.visibleGajiDialog;
        },
        handleDelete(id) {
            deleteData("/gaji", id);
            this.created();
        },
        handleEdit(id) {
            this.idGaji = id;
            this.formIsLoading = true;
            this.dialogTitle = "Edit Gaji Pegawai";
            this.formPost = false;
            this.getPegawaiAll();

            this.toggleGajiDialog();
            this.getGajiById(id);
        },

        async created() {
            try {
                this.data = await getData("/gaji");
                this.isLoading = false;
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        },
        openPost() {
            // Form
            this.formPost = true;
            (this.pegawai = null),
                (this.gaji_pokok = null),
                (this.tunjangan = null),
                (this.rekening = ""),
                (this.nama_bank = ""),
                this.toggleGajiDialog();
            this.dialogTitle = "Tambahkan Gaji Pegawai";
            this.getPegawaiAll();
        },

        async post() {
            this.toggleGajiDialog();
            this.hasValidated = true;
            const data = {
                id_pegawai: this.pegawai.id_pegawai,
                gaji_pokok: this.gaji_pokok,
                tunjangan: this.tunjangan,
                nama_bank: this.nama_bank,
                rekening: this.rekening,
            };

            await axios
                .post("/gaji", data)
                .then((res) => {
                    this.$toast.add({
                        severity: "success",
                        summary: "Success",
                        detail: res.data.message,
                        life: 3000,
                    });
                    this.created();
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
        async edit(id) {
            this.toggleGajiDialog();

            const data = {
                id_pegawai: this.pegawai.id_pegawai,
                gaji_pokok: this.gaji_pokok,
                tunjangan: this.tunjangan,
                nama_bank: this.nama_bank,
                rekening: this.rekening,
            };
            await axios
                .patch(`gaji/` + id, data)
                .then((res) => {
                    this.visible = false;
                    this.$toast.add({
                        severity: "info",
                        summary: "Edit Berhasil",
                        detail: `Gaji ${res.data.data.pegawai.nama_lengkap} Berhasil Di Edit`,
                        life: 3000,
                    });
                    this.created();
                })
                .catch((err) => {
                    console.log(err);
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
        async getGajiById(id) {
            await axios
                .get(`gaji/` + id)
                .then((res) => {
                    // Form
                    this.id_gaji = res.data.data.id_gaji;
                    this.pegawai = res.data.data.pegawai;
                    this.tunjangan = res.data.data.tunjangan;
                    this.gaji_pokok = res.data.data.gaji_pokok;
                    this.nama_bank = res.data.data.nama_bank;
                    this.rekening = res.data.data.rekening;

                    this.phPegawai = res.data.data.pegawai.nama_lengkap;

                    this.formIsLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted() {
        this.created();
    },
};
</script>

<template>
    <div class="grid grid-cols-12 m-5 gap-5 mb-24 lg:mb-5">
        <Card class="col-span-12 shadow-md">
            <template #title>
                <div class="flex justify-between">
                    <h3>Data Payroll Pegawai</h3>
                    <div class="flex gap-2">
                        <Button
                            icon="pi pi-plus-circle"
                            label="Tambah Payroll"
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
                    :dataLuar="dataPayroll"
                    @openDelete="handleDelete"
                    @openEdit="handleEdit"
                    api="/payroll"
                    id="id_payroll"
                />
            </template>
        </Card>

        <Dialog
            :visible="visiblePayrollDialog"
            modal
            header="Tambah Payroll Pegawai"
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
                    <form class="w-full grid grid-cols-8 gap-2">
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
                            name="potongan"
                            label="Potongan"
                            :hasValidated="hasValidated"
                        >
                            <InputNumber
                                id="potongan"
                                v-model="potongan"
                                class="col-span-12 max-h-[46px]"
                                :invalid="hasValidated && v$.name.$invalid"
                                placeholder="Masukkan potongan gaji pegawai"
                            />
                        </InputVuelidate>
                    </form>
                    <div class="flex justify-end gap-2">
                        <Button
                            type="button"
                            label="Cancel"
                            severity="secondary"
                            @click="togglePayrollDialog"
                        ></Button>
                        <Button
                            type="button"
                            label="Edit"
                            @click="edit(id_payroll)"
                            v-if="id_payroll"
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
    name: "AdminPayroll",
    inject: ["default"],
    data() {
        return {
            isLoading: true,
            visiblePayrollDialog: false,
            dataPayroll: [],
            columns: [
                { field: "nama_pegawai", header: "Nama Pegawai" },
                { field: "periode", header: "Periode" },
                { field: "total_gaji", header: "Total Gaji" },
            ],

            pegawai: null,
            daftarPegawai: null,
            phPegawai: "Loading...",
            loadingPegawai: true,

            v$: useVuelidate(),
            hasValidated: false,
            formPost: false,

            id_payroll: null,
            pegawai: null,
            potongan: null,

            formIsLoading: false,

            dialogTitle: "",
        };
    },
    validations() {
        return {
            id_pegawai: { required },
            potongan: { required },
        };
    },
    methods: {
        async getPayroll() {
            await axios
                .get("/payroll")
                .then((res) => {
                    // console.log(res.data.data)
                    this.dataPayroll = res.data.data;
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        togglePayrollDialog() {
            this.visiblePayrollDialog = !this.visiblePayrollDialog;
        },
        handleDelete(id) {
            deleteData("/payroll", id);
            this.getPayroll();
        },
        handleEdit(id) {
            this.id_payroll = id;
            this.formIsLoading = true;
            this.dialogTitle = "Edit Payroll Pegawai";
            this.formPost = false;
            this.getPegawaiAll();

            this.togglePayrollDialog();
            this.getPayrollById(id);
        },
        openPost() {
            // Form
            this.formPost = true;
            (this.pegawai = null),
                (this.potongan = null),
                this.togglePayrollDialog();
            this.dialogTitle = "Tambahkan Payroll Pegawai";
            this.getPegawaiAll();
        },

        async post() {
            this.togglePayrollDialog();
            this.hasValidated = true;

            const data = {
                id_pegawai: this.pegawai.id_pegawai,
                potongan: this.potongan,
            };

            await axios
                .post("/payroll", data)
                .then((res) => {
                    this.$toast.add({
                        severity: "success",
                        summary: "Success",
                        detail: res.data.message,
                        life: 3000,
                    });
                    this.getPayroll();
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
            this.togglePayrollDialog();

            const data = {
                id_pegawai: this.pegawai.id_pegawai,
                potongan: this.potongan,
            };
            await axios
                .patch(`payroll/` + id, data)
                .then((res) => {
                    this.visible = false;
                    this.$toast.add({
                        severity: "info",
                        summary: "Edit Berhasil",
                        detail: `Payroll ${res.data.data.nama_pegawai} Berhasil Di Edit`,
                        life: 3000,
                    });
                    this.getPayroll();
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
        async getPayrollById(id) {
            await axios
                .get(`payroll/` + id)
                .then((res) => {
                    this.potongan = res.data.data.potongan;
                    this.pegawai = res.data.data.pegawai;
                    this.phPegawai = res.data.data.nama_pegawai;

                    this.formIsLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted() {
        this.getPayroll();
    },
};
</script>

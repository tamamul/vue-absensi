<template>
    <Card class="col-span-12 shadow-md">
        <template #title>
            <div class="flex justify-between">
                <h3>Daftar Jadwal Kerja</h3>
                <Button
                    icon="pi pi-plus-circle"
                    label="Tambah"
                    @click="handlePost()"
                />
            </div>
        </template>
        <template #content>
            <TableDefault
                api="/jadwal"
                id="id_jadwal"
                :dataLuar="dataJadwalKerja"
                @openEdit="handleEdit"
                @openDelete="handleDelete"
            >
                <Column header="Nama Jadwal">
                    <template #body="slotProps">
                        {{
                            slotProps.data.is_default
                                ? "Default " + slotProps.data.nama_jadwal
                                : slotProps.data.nama_jadwal
                        }}
                    </template>
                </Column>
                <Column header="Menggunakan Shift" style="max-width: 400px">
                    <template #body="slotProps">
                        <div class="flex gap-2 flex-wrap">
                            <div
                                v-for="(item, index) in slotProps.data.jadwal"
                                :key="index"
                                class="color-box"
                                :style="{ backgroundColor: item.warna }"
                            >
                                {{ item.nama_shift + " | " + item.hari }}
                            </div>
                        </div>
                    </template>
                </Column>
            </TableDefault>
        </template>
    </Card>

    <Dialog
        :visible="visible"
        modal
        header="Tambahkan Jadwal Kerja"
        :style="{ width: '40rem' }"
    >
        <template #container>
            <!-- <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ pesan }}</span> -->
            <form class="p-7 grid grid-cols-12 overflow-y-auto">
                <p class="col-span-12 text-xl mb-6 font-semibold">
                    {{ dialogTitle }}
                </p>
                <div class="col-span-12 w-full gap-1">
                    <InputVuelidate
                        name="nama_jadwal"
                        label="Nama Jadwal"
                        :hasValidated="hasValidated"
                    >
                        <InputText
                            id="nama_jadwal"
                            v-model="nama_jadwal"
                            class="col-span-12 max-h-[46px]"
                            :invalid="hasValidated && v$.nama_jadwal.$invalid"
                        />
                    </InputVuelidate>
                </div>

                <div
                    class="col-span-12 flex justify-center overflow-x-auto mb-3 gap-2"
                >
                    <BtnJadwalKerja
                        hari="Senin"
                        @openShift="openShift('Senin')"
                    />
                    <BtnJadwalKerja
                        hari="Selasa"
                        @openShift="openShift('Selasa')"
                    />
                    <BtnJadwalKerja
                        hari="Rabu"
                        @openShift="openShift('Rabu')"
                    />
                    <BtnJadwalKerja
                        hari="Kamis"
                        @openShift="openShift('Kamis')"
                    />
                    <BtnJadwalKerja
                        hari="Jum'at"
                        @openShift="openShift('Jumat')"
                    />
                    <BtnJadwalKerja
                        hari="Sabtu"
                        @openShift="openShift('Sabtu')"
                    />
                    <BtnJadwalKerja
                        hari="Minggu"
                        @openShift="openShift('Minggu')"
                    />
                </div>

                <div
                    class="col-span-12 w-full flex flex-col gap-2 mb-3"
                >
                    <p>Pilih Jadwal Kerja</p>
                    <div v-for="item in data" :key="item.id_shift">
                        <p>Hari : {{ item.hari }}</p>
                        <Shift :api="`shift/${item.id_shift}`" />
                    </div>
                </div>

                <div class="col-span-12 flex justify-end gap-2">
                    <Button
                        type="button"
                        label="Cancel"
                        severity="secondary"
                        @click="toggleJadwalKerja"
                    ></Button>
                    <Button type="button" label="Save" @click="post()"></Button>
                </div>
            </form>
        </template>
    </Dialog>

    <Dialog
        v-model:visible="visibleShift"
        modal
        header="Pilih Jadwal Kerja"
        :style="{ width: '30rem' }"
    >
        <div class="flex flex-col gap-2 mb-3">
            <AddShift
                v-for="item in shift"
                :key="item.id_shift"
                :id="item.id_shift"
                :nama_shift="item.nama_shift"
                :warna="item.warna"
                :jam_masuk="item.jam_masuk"
                :jam_keluar="item.jam_keluar"
                @click="selectShift(item.nama_shift, item.id_shift)"
            />
        </div>

        <div class="flex justify-end gap-2">
            <Button
                type="button"
                label="Cancel"
                severity="secondary"
                @click="visibleShift = false"
            ></Button>
        </div>
    </Dialog>
</template>

<script>
export default {
    name: "CardJadwalKerja",
    data() {
        return {
            jadwalKerja: null,
            visible: false,

            data: [],
            dataJadwalKerja: [],
            shift: [],
            hari: "",
            visibleShift: false,
            selectedShift: null,
            selectedShiftId: null,
            nama_jadwal: "",
            hasValidated: false,

            dialogTitle: "",
        };
    },
    validations() {
        return {
            nama_jadwal: { required },
        };
    },
    watch: {
        data: "updateData",
        selectedShift: "updateData",
        nama_jadwal: "updateData",
    },
    computed: {
        getColors() {
            return this.dataFromAPI?.jadwal?.map((item) => item.warna) || [];
        },
    },
    methods: {
        toggleJadwalKerja() {
            this.visible = !this.visible;
        },
        handlePost() {
            // this.data = ''
            // this.nama_jadwal = ''
            // this.selectedShift = false

            this.toggleJadwalKerja();
            this.getAllShift();
            this.dialogTitle = "Tambah Jadwal Kerja";
        },
        handleEdit(id) {
            this.toggleJadwalKerja();
            this.getAllShift();
            this.data = [];
            this.dialogTitle = "Edit Jadwal Kerja";
            this.jadwalKerja = id;
            this.getJadwalKerjaById(id);
        },
        handleDelete(id) {
            console.log(id);
            deleteData("/jadwal", id);
            this.getAllJadwalKerja();
        },

        selectShift(nama_shift, id_shift) {
            this.selectedShift = nama_shift;
            this.selectedShiftId = id_shift;
            this.visibleShift = !this.visibleShift;
        },
        openShift(hari) {
            this.hari = hari;
            this.visibleShift = !this.visibleShift;
        },
        updateData() {
            if (!this.hari || !this.selectedShiftId) return; // Abaikan jika data tidak lengkap

            const temp = {
                hari: this.hari,
                id_shift: this.selectedShiftId,
            };
            const existingIndex = this.data.findIndex(
                (item) => item.hari === this.hari
            );

            if (existingIndex !== -1) {
                this.data[existingIndex] = temp;
            } else {
                this.data.push(temp);
            }

            this.hari = ""; // Reset hari setelah di-update
            this.selectedShiftId = null; // Reset shift ID setelah di-update
        },

        async getAllJadwalKerja() {
            try {
                this.dataJadwalKerja = await getData("/jadwal");
                this.isLoading = false;
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        },
        async getJadwalKerjaById(id) {
            await axios
                .get(`jadwal/` + id)
                .then((res) => {
                    // Form
                    this.nama_jadwal = res.data.data.nama_jadwal;
                    this.data = res.data.data.jadwal;
                    this.formIsLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async getAllShift() {
            await axios
                .get("shift")
                .then((res) => {
                    this.isLoading = false;
                    this.shift = res.data.data;
                    // console.log(res.data.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async postJadwalKerja() {
            const data = {
                nama_jadwal: this.nama_jadwal,
                jadwal: this.data,
            };
            await axios
                .post("jadwal", data)
                .then((res) => {
                    this.toggleJadwalKerja();
                    this.getAllJadwalKerja();
                    this.$toast.add({
                        severity: "success",
                        summary: "Jadwal kerja berhasil ditambahkan!",
                        detail: `Menambahkan jadwal kerja ${res.data.data.nama_jadwal}`,
                        life: 5000,
                    });
                })
                .catch((err) => {
                    this.$toast.add({
                        severity: "error",
                        summary: "Jadwal kerja gagal ditambahkan!",
                        detail: `Gagal menambahkan jadwal kerja`,
                        life: 5000,
                    });
                    this.toggleJadwalKerja();
                    console.log(err);
                });
        },
        async postJadwalKerjaDefault() {
            const data = {
                nama_jadwal: this.nama_jadwal,
                is_default: true,
                jadwal: this.data,
            };
            await axios
                .post("jadwal", data)
                .then((res) => {
                    // console.log(res)
                    this.toggleJadwalKerja();
                    this.getAllJadwalKerja();
                    this.$toast.add({
                        severity: "success",
                        summary: "Jadwal kerja berhasil ditambahkan!",
                        detail: `Menambahkan jadwal kerja ${res.data.data.nama_jadwal}`,
                        life: 5000,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.toggleJadwalKerja();
                    this.getAllJadwalKerja();
                    this.$toast.add({
                        severity: "error",
                        summary: "Jadwal kerja gagal ditambahkan!",
                        detail: `Gagal menambahkan jadwal kerja`,
                        life: 5000,
                    });
                });
        },
        post() {
            this.is_default
                ? this.postJadwalKerjaDefault()
                : this.postJadwalKerja();
        },
    },
    mounted() {
        this.getAllJadwalKerja();
    },
};
</script>

<style scoped>
.color-box {
    display: inline-block;
    min-width: 100px;
    padding: 8px;
    margin: 4px;
    text-align: center;
    color: white;
    border-radius: 4px;
}
</style>

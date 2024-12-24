<template>
    <div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
    </div>

    <div class="grid grid-cols-12 gap-5 m-5 mb-24 lg:mb-5" v-else>
        <Card class="col-span-12 shadow-md">
            <template #title>
                <div class="w-full text-center">Konfirmasi Absensi Pegawai</div>
            </template>
            <template #content>
                <Tabs value="0">
                    <TabList>
                        <Tab value="0">Absen Masuk</Tab>
                        <Tab value="1">Absen Keluar</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel value="0">
                            <div class="flex flex-col">
                                <InputText
                                    type="text"
                                    v-model="kodeAbsensi"
                                    @keydown.enter="postKodeAbsensi"
                                    autofocus />
                            </div>
                        </TabPanel>
                        <TabPanel value="1">
                            <div class="flex flex-col">
                                <InputText
                                    type="text"
                                    v-model="kodeAbsensi"
                                    @keydown.enter="postKodeAbsensiKeluar"
                                    autofocus />
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </template>
        </Card>

        <Card class="col-span-12 shadow-md">
            <template #title>
                Daftar Pegawai Telah Absen
                <div class="mt-4 flex gap-3 items-center">
                    <label for="date" class="font-semibold">
                        Data Absen Tanggal :
                    </label>
                    <DatePicker
                        v-model="date"
                        name="date"
                        id="date"
                        view="date"
                        dateFormat="dd/mm/yy"
                        placeholder="Pilih tanggal" />
                    <Button
                        type="button"
                        label="Filter"
                        severity="primary"
                        @click="getDataKehadiran(date)"></Button>
                </div>
            </template>
            <template #content>
                <!-- <TableDefault
                    :columns="columns"
                    api="/kehadiran"
                    id="id_kehadiran"
                    idPegawai="id_pegawai"
                    :dataLuar="data"
                    :deleteAble="false"
                    @openEdit="handleEdit">
                    <Column header="Waktu Kehadiran" field="hari">
                        <template #body="slotProps">
                            {{
                                slotProps.data.hari == "Selasa" ? slotProps.data.tgl_kehadiran : slotProps.data.hari +
                                ", " +
                                slotProps.data.tgl_kehadiran ?? "-"
                            }}
                        </template>
                    </Column>
                </TableDefault> -->
                <DataTable
                    v-model:filters="filters"
                    :value="data"
                    tableStyle="min-width: 50rem"
                    paginator
                    :rows="5"
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                    scrollable
                    :loading="loading"
                    filterDisplay="menu"
                >
                    <template #header>
                        <div class="flex justify-between">
                            <Button
                                type="button"
                                icon="pi pi-filter-slash"
                                label="Bersihkan Filter"
                                outlined
                                @click="clearFilter()"
                            />
                            <InputText
                                v-model="filters['global'].value"
                                placeholder="Cari data"
                            />
                        </div>
                    </template>
                    <template #loading>
                        <ProgressSpinner></ProgressSpinner>
                    </template>
                    <template #empty> Data tidak ditemukan. </template>
                    <Column field="no" header="No.">
                        <template #body="slotProps">
                            {{ calculateRowNumber(slotProps) + `.` }}
                        </template>
                    </Column>
                    <Column field="nama_pegawai" header="Nama Pegawai"></Column>
                    <Column field="status" header="Status"></Column>
                    <Column field="jam_masuk" header="Jam Masuk"></Column>
                    <Column field="jam_keluar" header="Jam Keluar"></Column>
                    <Column header="Waktu Kehadiran" field="hari">
                        <template #body="slotProps">
                            {{
                                slotProps.data.hari == "Selasa" ? slotProps.data.tgl_kehadiran : slotProps.data.hari +
                                ", " +
                                slotProps.data.tgl_kehadiran ?? "-"
                            }}
                        </template>
                    </Column>
                    <Column header="Action" frozen alignFrozen="right" style="width: 100px">
                        <template #body="slotProps">
                            <div class="flex gap-2 bg-white">
                                <Button
                                    icon="pi pi-pencil"
                                    severity="info"
                                    aria-label="Edit"
                                    @click="handleEdit(slotProps.data.id_kehadiran, slotProps.data.id_pegawai)"
                                />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>
    </div>

    <Dialog :visible="visible" modal :style="{ width: '40rem' }">
        <template #container>
            <form class="p-7 grid grid-cols-12 gap-2">
                <p class="col-span-12 text-xl mb-6 font-semibold">
                    Edit Kehadiran Pegawai
                </p>

                <Select
                    class="col-span-12 max-h-[46px]"
                    v-model="pegawai"
                    :options="daftarPegawai"
                    optionLabel="nama_lengkap"
                    :loading="loadingPegawai"
                    :placeholder="phPegawai"
                    filter
					disabled
                ></Select>

                <div class="col-span-12 w-full gap-1">
                    <InputVuelidate
                        name="status"
                        label="Status"
                        :hasValidated="hasValidated">
                        <Select
                            id="status"
                            v-model="dataStatus"
                            placeholder="Pilih status kehadiran"
                            :options="status"
                            optionLabel="name"
                            class="col-span-12 max-h-[46px]"
                            :invalid="hasValidated && v$.dataStatus.$invalid" />
                    </InputVuelidate>
                </div>
                <div class="col-span-6 w-full gap-1">
                    <InputVuelidate
                        name="jam_masuk"
                        label="Jam Masuk"
                        :hasValidated="hasValidated">
                        <DatePicker
                            timeOnly
                            id="jam_masuk"
                            v-model="jam_masuk"
                            placeholder="Pilih jam masuk"
                            class="col-span-12 max-h-[46px]"
                            :invalid="hasValidated && v$.jam_masuk.$invalid" />
                    </InputVuelidate>
                </div>
                <div class="col-span-6 w-full gap-1">
                    <InputVuelidate
                        name="jam_keluar"
                        label="Jam Keluar"
                        :hasValidated="hasValidated">
                        <DatePicker
                            timeOnly
                            id="jam_keluar"
                            v-model="jam_keluar"
                            placeholder="Pilih jam keluar"
                            class="col-span-12 max-h-[46px]"
                            :invalid="hasValidated && v$.jam_keluar.$invalid" />
                    </InputVuelidate>
                </div>
                <div class="col-span-12 w-full gap-1">
                    <InputVuelidate
                        name="tgl_kehadiran"
                        label="Tanggal Kehadiran"
                        :hasValidated="hasValidated">
                        <DatePicker
							id="tgl_kehadiran"
							v-model="tgl_kehadiran"
							placeholder="Pilih tanggal kehadiran"
							dateFormat="yy/mm/dd"
							class="col-span-12 max-h-[46px]"
							:invalid="hasValidated && v$.tgl_kehadiran.$invalid"
						/>
                    </InputVuelidate>
                </div>
                <div class="col-span-12 flex justify-end gap-2">
                    <Button
                        type="button"
                        label="Cancel"
                        severity="secondary"
                        @click="toggleVisible"></Button>
                    <Button type="button" label="Save" @click="saveData"></Button>
                </div>
            </form>
        </template>
    </Dialog>
</template>

<script>
    export default {
        name: "Absensi",
        inject: ["default"],
        data() {
            return {
                isLoading: false,
                inputIsLoading: false,
                kodeAbsensi: "",
                data: [],
                dataId: [],
                dataIdPegawai: [],
                tahun: "",
                bulan: "",
                visible: false,
                date: new Date(),
                outline: false,
                tanggal: new Date(),
                loadingPegawai: true,
                editMode: false,
                filters: { global: { value: null, matchMode: "contains" } },
                loading: true,
                columns: [
                    { field: "nama_pegawai", header: "Nama Pegawai" },
                    { field: "status", header: "Status" },
                    { field: "jam_masuk", header: "Jam Masuk" },
                    { field: "jam_keluar", header: "Jam Keluar" },
                ],
                // Validation
                hasValidated: false,
                v$: useVuelidate(),
                // FORM
                idKehadiran: "",
                dataStatus: "",
                status: [
                    { name: "Hadir", code: "Hadir" },
                    { name: "Terlambat", code: "Terlambat" },
                    { name: "Izin", code: "Izin" },
                    { name: "Tidak Hadir", code: "Tidak Hadir" },
                ],
                pegawai: "",
                daftarPegawai: null,
                phPegawai: "Loading...",
                kode_kehadiran: "",
                hari: "",
                tgl_kehadiran: "",
                jam_masuk: "",
                jam_keluar: "",
            };
        },
        validation() {
            return {
                dataStatus: { required },
                pegawai: { required },
                kode_kehadiran: { required },
                hari: { required },
                tgl_kehadiran: { required },
                jam_masuk: { required },
                jam_keluar: { required },
            };
        },
        methods: {
            formattedDate,
            parseDate,
            getTanggalDanHari,
            async created() {
                try {
                    this.data = await getData("/kehadiran");
                    this.loading = false;
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            },
            async getPegawaiAll() {
                try {
                    const res = await axios.get("pegawai");
                    this.daftarPegawai = res.data.data;
                    console.log(this.daftarPegawai)
                    this.loadingPegawai = false;
                    this.phPegawai = "Pilih pegawai";
                } catch (err) {
                    console.log("Error:" + err);
                    this.phPegawai = "Error";
                    this.loadingPegawai = false;
                }
            },
            toggleVisible() {
                this.visible = !this.visible;
            },

            // Handle when editing or creating attendance
            async handleEdit(id, idPegawai) {
                if (!id) {
                    this.$toast.add({
                        severity: "warn",
                        summary: "Warning",
                        detail: "ID tidak valid. Tidak dapat memuat data.",
                        life: 3000,
                    });
                    return;
                }

                this.toggleVisible();

                try {
                    // Fetch attendance data
                    this.dataId = await getData(`/kehadiran/${id}`);
                    console.log(this.dataId)

                    // Populate form for edit mode
                    this.editMode = true; // EDIT mode
                    this.daftarPegawai = this.dataId.id_pegawai;
                    this.dataStatus = this.status.find((item) => item.code === this.dataId.status) || null;
                    this.kode_kehadiran = this.dataId.kode_kehadiran;
                    this.hari = this.dataId.hari;
                    this.tgl_kehadiran = this.parseDate(this.dataId.tgl_kehadiran);
                    this.jam_masuk = this.dataId.jam_masuk;
                    this.jam_keluar = this.dataId.jam_keluar;
                } catch (error) {
                    console.log(idPegawai)

                    // If no attendance, fetch employee data
                    this.editMode = false; // POST mode
                    this.dataIdPegawai = await getData(`/pegawai/${idPegawai}`);
                    this.daftarPegawai = this.dataIdPegawai.id_pegawai;
                    this.dataStatus = "";
                    this.kode_kehadiran = "";
                    this.hari = this.dataIdPegawai.hari || "Senin"; // Default to current day
                    this.tgl_kehadiran = this.tanggal; // Default to today's date
                    this.jam_masuk = "";
                    this.jam_keluar = "";
                }
            },
            clearFilter() {
                this.filters = { global: { value: null, matchMode: "contains" } };
            },
            // Save the attendance data (POST or PUT)
            async saveData() {
                this.hasValidated = true;
                if (!this.v$.$invalid) {
                const payload = {
                    id_kehadiran: this.editMode ? this.dataId.id_kehadiran : null,
                    id_pegawai: this.pegawai,
                    status: this.dataStatus ? this.dataStatus.code : "",
                    kode_kehadiran: this.kode_kehadiran,
                    hari: this.hari,
                    tgl_kehadiran: this.tgl_kehadiran,
                    jam_masuk: this.jam_masuk,
                    jam_keluar: this.jam_keluar,
                };

                try {
                    if (this.editMode) {
                    // Edit (PUT)
                    const res = await axios.put(`/kehadiran/${payload.id_kehadiran}`, payload);
                    console.log("Data updated:", res);
                    this.$toast.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Data kehadiran berhasil diperbarui.",
                        life: 3000,
                    });
                    } else {
                    // Create (POST)
                    const res = await axios.post("/kehadiran", payload);
                    console.log("Data created:", res);
                    this.$toast.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Data kehadiran berhasil dibuat.",
                            life: 3000,
                        });
                    }
                    this.toggleVisible();
                    this.created(); // Reload data
                } catch (error) {
                    console.error("Error saving data:", error);
                    this.$toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: "Gagal menyimpan data.",
                        life: 3000,
                        });
                    }
                }
            },
            // toggleOutline() {
            // 	this.outline = !this.outline
            // },
            async getDataKehadiran(date) {
                this.tanggal = this.formattedDate(date)

                this.data = await getData(`/kehadiran?tgl_kehadiran=${this.tanggal}`);

                console.log(this.tanggal);
            },
            async postKodeAbsensi() {
                console.log(this.kodeAbsensi);
                const data = { token: this.kodeAbsensi };
                await axios
                    .post("kehadiran/masuk/confirm", data)
                    .then((res) => {
                        console.log(res);
                        this.created();
                        this.kodeAbsensi = "";
                        this.$toast.add({
                            severity: "success",
                            summary: "Success",
                            detail: res.data.message,
                            life: 3000,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$toast.add({
                            severity: "error",
                            summary: "Error",
                            detail: `${err.request.response.message}`,
                            life: 3000,
                        });
                        this.kodeAbsensi = "";
                    });
            },
            calculateRowNumber(slotProps) {
                const firstIndex =
                    this.$refs.dt && this.$refs.dt.first ? this.$refs.dt.first : 0;
                return (
                    firstIndex + this.data.indexOf(slotProps.data) + 1
                );
            },
            async postKodeAbsensiKeluar() {
                console.log(this.kodeAbsensi);
                const data = { token: this.kodeAbsensi };
                await axios
                    .post("kehadiran/keluar/confirm", data)
                    .then((res) => {
                        console.log(res);
                        this.kodeAbsensi = "";
                        this.created();
                        this.$toast.add({
                            severity: "success",
                            summary: "Success",
                            detail: res.data.message,
                            life: 3000,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$toast.add({
                            severity: "error",
                            summary: "Error",
                            detail: err.data.message,
                            life: 3000,
                        });
                        this.kodeAbsensi = "";
                    });
            },
        },
        async mounted() {
            await this.created();
            await this.getPegawaiAll();
        },
    };
</script>

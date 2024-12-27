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
                <div class="flex mt-4 overflow-x-auto whitespace-nowrap gap-2">
                    <Button
                        v-for="item in daftarHari"
                        :key="item.tanggal"
                        type="button"
                        :label="
                            tahun +
                            `/` +
                            bulan +
                            `/` +
                            item.tanggal +
                            ` ` +
                            item.hari
                        "
                        severity="primary"
                        @click="toggleOutline"
                        class="flex-shrink-0"
                        :outlined="outline" />
                </div>
            </template>
            <template #content>
                <TableDefault
                    :columns="columns"
                    api="/kehadiran"
                    id="id_kehadiran"
                    :dataLuar="data"
                    :deleteAble="false"
                    @openEdit="handleEdit">
                    <Column header="Waktu Kehadiran" field="hari">
                        <template #body="slotProps">
                            {{
                                slotProps.data.hari +
                                ", " +
                                slotProps.data.tgl_kehadiran
                            }}
                        </template>
                    </Column>
                </TableDefault>
            </template>
        </Card>
    </div>

    <Dialog :visible="visible" modal :style="{ width: '40rem' }">
        <template #container>
            <form class="p-7 grid grid-cols-12 gap-2">
                <p class="col-span-12 text-xl mb-6 font-semibold">
                    Edit Kehadiran Pegawai
                </p>

                <div class="col-span-12 w-full gap-1">
                    
                    <InputVuelidate
                        name="pegawai"
                        label="Pegawai"
                        :hasValidated="hasValidated">
                        <Select
                            id="pegawai"
                            v-model="pegawai"
                            placeholder="Pilih pegawai"
                            :options="daftarPegawai"
                            optionLabel="nama_lengkap"
                            class="col-span-12 max-h-[46px]"
                            :invalid="hasValidated && v$.pegawai.$invalid" />
                    </InputVuelidate>
                </div>
            <!-- <Select
                class="col-span-12 max-h-[46px]"
                v-model="pegawai"
                :options="daftarPegawai"
                optionLabel="nama_lengkap"
                :loading="loadingPegawai"
                :placeholder="phPegawai"
                filter></Select> -->

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
                            :options="tgl_kehadiran"
                            optionLabel="name"
                            class="col-span-12 max-h-[46px]"
                            :invalid="
                                hasValidated && v$.tgl_kehadiran.$invalid
                            " />
                    </InputVuelidate>
                </div>
                <div class="col-span-12 flex justify-end gap-2">
                    <Button
                        type="button"
                        label="Cancel"
                        severity="secondary"
                        @click="toggleVisible"></Button>
                    <Button type="button" label="Save" @click="edit"></Button>
                </div>
            </form>
        </template>
    </Dialog>
</template>

<script>
import { parseDate } from '@/utils/date';

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
                daftarHari: [],
                tahun: "",
                bulan: "",
                visible: false,
                date: new Date(),
                outline: false,
                tanggal: "",
                loadingPegawai: true,
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
            justMonth,
            justYear,
            parseDate,
            getTanggalDanHari,
            async created() {
                try {
                    this.data = await getData("/kehadiran");
                    this.isLoading = false;
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
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
			async getId(id) {
				try {
					this.dataId = await getData(`/kehadiran/${id}`);
					
					// Map the response data to the form fields
					this.pegawai = this.daftarPegawai.find(
						(pegawai) => pegawai.id_pegawai === this.dataId.id_pegawai
					) || null; // Match pegawai by id or set to null if not found
					this.dataStatus = this.status.find(
						(item) => item.code === this.dataId.status
					) || null; // Match status by code or set to null if not found
					this.kode_kehadiran = this.dataId.kode_kehadiran;
					this.hari = this.dataId.hari;

					// Convert tgl_kehadiran to a Date object
					this.tgl_kehadiran = this.parseDate(this.dataId.tgl_kehadiran);

					// Parse jam_masuk and jam_keluar if necessary
					this.jam_masuk = this.dataId.jam_masuk;
					this.jam_keluar = this.dataId.jam_keluar;

				} catch (error) {
					console.error("Failed to fetch data:", error);
				}
			},

            async edit() {
                this.hasValidated = true;
                if (!this.v$.$invalid) {
                    const data = {
                        id_kehadiran: this.dataId.id_kehadiran,
                        id_pegawai: this.pegawai,
                        status: this.dataStatus,
                        kode_kehadiran: this.kode_kehadiran,
                        hari: this.hari,
                        tgl_kehadiran: this.tgl_kehadiran,
                        jam_masuk: this.jam_masuk,
                        jam_keluar: this.jam_keluar,
                    };
                    await axios
                        .put("kehadiran", data)
                        .then((res) => {
                            console.log(res);
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
                                detail: err,
                                life: 3000,
                            });
                        });
                }
            },
            handleEdit(id) {
                this.toggleVisible();
                this.getId(id);
                // this.getJadwalKerja();
            },
            toggleVisible() {
                this.visible = !this.visible;
            },
            // toggleOutline() {
            // 	this.outline = !this.outline
            // },
            getDataKehadiran(date) {
                this.bulan = this.justMonth(date);
                this.tahun = this.justYear(date);
                this.daftarHari = this.getTanggalDanHari(
                    this.bulan,
                    this.tahun
                );
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
                            detail: `${err.response.data.message}`,
                            life: 3000,
                        });
                        this.kodeAbsensi = "";
                    });
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

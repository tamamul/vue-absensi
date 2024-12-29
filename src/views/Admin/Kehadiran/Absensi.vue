<template>
    <div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
    </div>

    <div class="grid grid-cols-12 gap-5 m-5 mb-24 lg:mb-5" v-else>
        <PageHeader title="Absensi" />

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
                <div class="mt-4 flex items-center justify-start">
                    <label for="date" class="font-semibold text-base mr-2">
                        Data Absen Tanggal :
                    </label>
                    <DatePicker
                        v-model="date"
                        name="date"
                        id="date"
                        view="date"
                        dateFormat="dd/mm/yy"
                        placeholder="Pilih tanggal"
                    >
                        <template #date="slotProps">
                            <strong @click="getDataKehadiran(date)">{{ slotProps.date.day }}</strong>
                        </template>
                    </DatePicker>
                    <ProgressSpinner style="width: 40px; height: 40px" v-show="loadingTable" strokeWidth="8" aria-label="Loading" />
                </div>
            </template>
            <template #content>
                <TableDefault
                    :columns="columns"
                    api="/kehadiran"
                    id="id_kehadiran"
                    :dataLuar="data"
                    :deleteAble="false"
                    :cusAction = true
                >
                    <Column header="Waktu Kehadiran" field="tgl_kehadiran">
                        <template #body="slotProps">
                            <td>{{ slotProps.data.tgl_kehadiran !== '-' ? slotProps.data.hari + ", " + slotProps.data.tgl_kehadiran : "-" }}</td>
                        </template>
                    </Column>

                    <Column header="Action"
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
                                    @click="openForm(slotProps.data.id_kehadiran, slotProps.data.id_pegawai)"
                                />
                            </div>
                        </template>
                    </Column>
                </TableDefault>
            </template>
        </Card>
    </div>

    <Dialog v-model:visible="visible" modal :style="{ width: '40rem' }">
        <template #container>
            <form class="p-7 grid grid-cols-12 gap-2">
                <p class="col-span-12 text-xl mb-6 font-semibold">
                    Edit Kehadiran Pegawai
                </p>
                <p v-show="pesan" class="col-span-12 font-semibold text-red-500">
                    Isi Semua Input Data!
                </p>

                <div class="col-span-12 w-full gap-1">
                    <label class="max-h-6 col-span-12 mb-2" for="pegawai">Pegawai <span class="text-red-500">*</span></label>
                    <Select
                        disabled
                        input-id="pegawai"
                        name="pegawai"
                        v-model="pegawai"
                        placeholder="Pilih pegawai"
                        :options="daftarPegawai"
                        optionLabel="nama_lengkap"
                        class="w-full mb-3"
                    />
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
                    <label class="max-h-6 col-span-12 mb-2" for="status">Status Kehadiran <span class="text-red-500">*</span></label>
                    <Select
                        input-id="status"
                        name="status"
                        v-model="dataStatus"
                        placeholder="Pilih status kehadiran"
                        :options="status"
                        optionLabel="name"
                        class="w-full mb-3"
                    />
                </div>
                <div class="col-span-6 w-full gap-1">
                    <InputVuelidate
                        name="jam_masuk"
                        label="Jam Masuk"
                        >
                        <DatePicker
                            timeOnly
                            input-id="jam_masuk"
                            v-model="jam_masuk"
                            placeholder="Pilih jam masuk"
                            class="col-span-12 max-h-[46px]"
                        />
                    </InputVuelidate>
                </div>
                <div class="col-span-6 w-full gap-1">
                    <InputVuelidate
                        name="jam_keluar"
                        label="Jam Keluar"
                    >
                        <DatePicker
                            timeOnly
                            input-id="jam_keluar"
                            v-model="jam_keluar"
                            placeholder="Pilih jam keluar"
                            class="col-span-12 max-h-[46px]"
                        />
                    </InputVuelidate>
                </div>
                <div class="col-span-12 w-full gap-1">
                    <InputVuelidate
                        name="tgl_kehadiran"
                        label="Tanggal Kehadiran"
                    >
                        <DatePicker
                            input-id="tgl_kehadiran"
                            v-model="tgl_kehadiran"
                            placeholder="Pilih tanggal kehadiran"
                            :options="tgl_kehadiran"
                            optionLabel="name"
                            class="col-span-12 max-h-[46px]"
                        />
                    </InputVuelidate>
                </div>
                <div class="col-span-12 flex justify-end gap-2">
                    <Button
                        type="button"
                        label="Cancel"
                        severity="secondary"
                        @click="toggleVisible"></Button>
                    <Button type="button" :label="!postOrEdit ? 'Edit' : 'Tambahkan'" @click="!postOrEdit ? edit(idKehadiran) : post()"></Button>
                </div>
            </form>
        </template>
    </Dialog>
</template>

<script>
import { getData } from '@/utils/fetch';

    export default {
        name: "Absensi",
        inject: ["default"],
        data() {
            return {
                isLoading: false,
                inputIsLoading: false,
                kodeAbsensi: "",
                loadingTable: false,
                data: [],
                dataId: [],
                daftarHari: [],
                visible: false,
                date: new Date(),
                outline: false,
                tanggal: "",
                postOrEdit: false,
                pesan: false,
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
                dataEditPegawai: "",
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
            formattedDate,
            formatTimee,
            parseDate,
            async created(date) {
                try {
                    this.data = !date ? await getData("/kehadiran") : await getData(`/kehadiran?tgl_kehadiran=${date}`);
                    this.loadingTable = false;
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
					) || null; // Match pegawai by id or set to null if Edit found
					this.dataStatus = this.status.find(
						(item) => item.code === this.dataId.status
					) || null; // Match status by code or set to null if not found
					this.kode_kehadiran = this.dataId.kode_kehadiran;
					this.hari = this.dataId.hari;
                    this.idKehadiran = this.dataId.id_kehadiran

					// Convert tgl_kehadiran to a Date object
					this.tgl_kehadiran = this.parseDate(this.dataId.tgl_kehadiran);

					// Parse jam_masuk and jam_keluar if necessary
					this.jam_masuk = this.dataId.jam_masuk;
                    this.jam_keluar = this.dataId.jam_keluar;

				} catch (error) {
					console.error("Failed to fetch data:", error);
				}
			},

            async edit(id) {
                this.hasValidated = true
                const data = {
                    id_kehadiran: this.dataId.id_kehadiran,
                    id_pegawai: this.pegawai.id_pegawai,
                    status: this.dataStatus.code,
                    kode_kehadiran: this.kode_kehadiran,
                    hari: this.hari,
                    tgl_kehadiran: this.formattedDate(this.tgl_kehadiran),
                    jam_masuk: formatTimee(this.jam_masuk),
                    jam_keluar: formatTimee(this.jam_keluar),
                };
                await axios.patch(`kehadiran/${id}`, data).then((res) => {
                    console.log(res);
                    this.created();
                    this.$toast.add({
                        severity: "success",
                        summary: "Success",
                        detail: res.data.message,
                        life: 3000,
                    });
                    this.toggleVisible();
                })
                .catch((err) => {
                    console.log(err);
                    this.$toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: err,
                        life: 3000,
                    });
                    this.pesan = true
                    this.toggleVisible();
                });
                this.hasValidated = false
            },
            async post(){
                this.hasValidated = true;
                const data = {
                    id_pegawai: this.pegawai.id_pegawai,
                    status: this.dataStatus.code,
                    kode_kehadiran: this.kode_kehadiran,
                    hari: this.hari,
                    tgl_kehadiran: this.formattedDate(this.tgl_kehadiran),
                    jam_masuk: formatTimee(this.jam_masuk),
                    jam_keluar: formatTimee(this.jam_keluar),
                };
                await axios
                    .post("kehadiran", data)
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
                        this.pesan = true
                        console.log(err);
                        this.$toast.add({
                            severity: "error",
                            summary: "Error",
                            detail: err,
                            life: 3000,
                        });
                    });

                this.hasValidated = false
            },
            async getPegawai(id) {
                this.dataId = await getData(`/pegawai/${id}`);
                this.pegawai = this.daftarPegawai.find(
                    (pegawai) => pegawai.id_pegawai === this.dataId.id_pegawai
                ) || null;
                // Map the response data to the form fields
                this.dataStatus = ''
                this.kode_kehadiran = '';
                this.hari = '';

                // Convert tgl_kehadiran to a Date object
                this.tgl_kehadiran = '';

                // Parse jam_masuk and jam_keluar if necessary
                this.jam_masuk = this.dataId.jam_masuk;
                this.jam_keluar = this.dataId.jam_keluar;
            },
            openForm(id, idPegawai) {
                this.toggleVisible();
                console.log(id)
                if (id === 0) {
                    this.postOrEdit = true
                    this.getPegawai(idPegawai)
                } else {
                    this.postOrEdit = false
                    this.getId(id);
                }
                // this.getJadwalKerja();
            },
            toggleVisible() {
                this.visible = !this.visible;
                this.pesan = false
            },
            getDataKehadiran(date) {
                this.loadingTable = !this.loadingTable;

                this.created(this.formattedDate(date));
            },
            async postKodeAbsensi() {
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

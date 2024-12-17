<template>
    <Dialog
        :visible="visible"
        modal
        header="Tambah Gaji Pegawai"
        :style="{ width: '70rem' }"
    >
        <template #container>
            <div class="p-7">
                <form class="w-full grid grid-cols-12 gap-2">
                    <p class="col-span-12 text-xl mb-6 font-semibold">
                        Tambahkan Jadwal Kerja
                    </p>

                    <InputVuelidate
                        name="nama_lengkap"
                        label="Pilih Pegawai"
                        :hasValidated="hasValidated"
                    >
                        <Select
                            class="col-span-12 max-h-[46px]"
                            v-model="id_pegawai"
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
                        @click="toggle"
                    ></Button>
                    <Button type="button" label="Save" @click="post"></Button>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script>
export default {
    name: "DialogGajiPegawai",
    inject: ["default"],
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        id: {
            type: Number,
            default: null,
        },
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
    emits: ["toggle"],
    data() {
        return {
            pegawai: null,
            daftarPegawai: null,
            phPegawai: "Loading...",
            loadingPegawai: true,

            v$: useVuelidate(),
            hasValidated: false,

            id_pegawai: null,
            gaji_pokok: null,
            tunjangan: null,
            rekening: "",
            nama_bank: "",
        };
    },
    methods: {
        toggle() {
            this.$emit("toggle");
        },
        async created() {
            try {
                this.data = await getData("/gaji");
                this.loading = false;
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        },
        async post() {
            this.toggle();
            this.hasValidated = true;
            const data = {
                id_pegawai: this.id_pegawai,
                gaji_pokok: this.gaji_pokok,
                tunjangan: this.tunjangan,
                nama_bank: this.nama_bank,
                rekening: this.rekening,
            };
            // console.log(data)
            this.hasValidated = true;

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
                    // console.log(res)
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
    },
    mounted() {
        this.getPegawaiAll();
    },
};
</script>

<template>
  
</template>

<script>
export default {
    name: "TablePegawai",
    data() {
        return {
            pegawai: [],
            filters: { global: { value: null, matchMode: "contains" } },
            genderOptions: [
                { label: "Laki-laki", value: "l" },
                { label: "Perempuan", value: "p" },
            ],
            no: 1,
            loading: true,
        };
    },
    methods: {
        calculateRowNumber(slotProps) {
            console.log(slotProps);
        },
        async getPegawaiAll() {
            try {
                const res = await axios.get("pegawai");
                this.pegawai = res.data.data;
                this.loading = false;
            } catch (err) {
                console.log("Error:" + err);
                this.loading = false;
            }
        },
        clearFilter() {
            this.filters = { global: { value: null, matchMode: "contains" } };
        },
        handleEmailVerification(email) {
            this.$emit("email-verification", email);
        },
        handleDelete(id) {
            this.$emit("delete-pegawai", event, id);
            this.getPegawaiAll();
        },
        handleEdit(id) {
            this.$emit("edit-pegawai", id);
        },
    },
    mounted() {
        this.getPegawaiAll();
    },
};
</script>

<style scoped>
/* Add any specific styling if needed */
</style>

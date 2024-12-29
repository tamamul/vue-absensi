<template>
    <DataTable
        v-model:filters="filters"
        :value="dataLuar ?? data"
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

        <!-- Column No -->
        <Column field="no" header="No.">
            <template #body="slotProps">
                {{ calculateRowNumber(slotProps) + `.` }}
            </template>
        </Column>

        <!-- Column Dinamis -->
        <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
        >
            <template #body="{ data, field }">
                <template v-if="field === 'jadwal.nama_jadwal'">
                    {{ data.jadwal ? data.jadwal.nama_jadwal : data[field] }}
                </template>
                <template v-else>
                    {{ data[field] }}
                </template>
            </template>
        </Column>

        <!-- Column Custom -->
        <slot />

        <!-- Column UD -->
        <Column 
            v-if="!cusAction" 
            header="Action" 
            frozen 
            alignFrozen="right" 
            style="width: 100px"
        >
            <template #body="slotProps">
                <TableActionStandard
                    :onEdit="handleEdit"
                    :onDelete="handleDelete"
                    :deleteAble="deleteAble"
                    :id="slotProps.data[id]"
                />
            </template>
        </Column>

    </DataTable>
</template>

<script>
export default {
    name: "TableDefault",
    inject: ["default"],
    emits: ["openEdit", "openDelete"],
    props: {
        columns: Array,
        api: String,
        apiEdit: String,
        id: String,
        idPegawai: String,
        dataLuar: Array,
        deleteAble: {
            type: Boolean,
            default: true,
        },
        refresh: {
            type: Boolean,
            default: false,
        },
        cusAction: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            data: [],
            loading: true,
            filters: { global: { value: null, matchMode: "contains" } },
        };
    },
    methods: {
        async created() {
            if (this.refresh) {
                this.loading = true;
            }
            try {
                this.data = await getData(this.api);
                this.loading = false;
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        },
        handleEdit(id) {
            this.$emit("openEdit", id);
            console.log("Edit ID:", id);
        },
        handleDelete(id) {
            this.$emit("openDelete", id);
            console.log("Hapus ID:", id);
        },
        clearFilter() {
            this.filters = { global: { value: null, matchMode: "contains" } };
        },
        calculateRowNumber(slotProps) {
            const firstIndex =
                this.$refs.dt && this.$refs.dt.first ? this.$refs.dt.first : 0;
            return (
                firstIndex +
                (this.dataLuar
                    ? this.dataLuar.indexOf(slotProps.data)
                    : this.data.indexOf(slotProps.data)) +
                1
            );
        },
    },
    mounted() {
        this.created();
    },
};
</script>

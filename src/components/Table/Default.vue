<template> 
    <DataTable
        v-model:filters="filters" 
        :value="data" 
        tableStyle="min-width: 50rem" 
        paginator 
        :rows="10"  
        :rowsPerPageOptions="[5, 10, 20, 50]" 
        scrollable
        :loading="loading" 
        filterDisplay="menu" 
    > 
        <template #header> 
            <div class="flex justify-between"> 
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" /> 
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" /> 
            </div> 
        </template> 
        <template #empty> Data tidak ditemukan. </template> 

		<!-- Column No -->
        <Column field="no" header="No.">
            <template #body="slotProps">
				{{ calculateRowNumber(slotProps) + `.` }}
            </template>
        </Column>

		<!-- Column Dinamis -->
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
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
		
		<!-- Column CRUD -->
        <Column header="Action" frozen alignFrozen="right" style="width: 100px;"> 
            <template #body="slotProps"> 
                <TableActionStandard 
                    :onEdit="handleEdit"  
                    :onDelete="handleDelete" 
                    :id="slotProps.data[id]" 
                /> 
            </template> 
        </Column> 
    </DataTable> 
</template> 

<script> 
export default { 
    name:'TableDefault', 
    inject:['default'], 
    props: { 
        columns: Array, 
        api: String,
        apiEdit: String,
        id: String 
    }, 
    data() { 
        return { 
            data: [], 
            filters: { global: { value: null, matchMode: 'contains' } }, 
            loading: true, 
        } 
    }, 
    methods: {
		onCellEditComplete(event) {
            let { data, newValue, field } = event;

            console.log({data, newValue, field})
        },
        async getData() {
            await axios.get(this.api).then((res) => {
                this.data = res.data.data;
                console.log(res.data.data);
                this.loading = false;
            }).catch((err) => {
                console.log(err);
            }); 
        }, 
        handleEdit(id) { 
            console.log('Edit ID:', id); 
        }, 
        handleDelete(id) { 
            console.log('Hapus ID:', id); 
        }, 
        clearFilter() { 
            this.filters = { global: { value: null, matchMode: 'contains' } }; 
        },
        calculateRowNumber(slotProps) {
            const firstIndex = this.$refs.dt && this.$refs.dt.first ? this.$refs.dt.first : 0;
            return firstIndex + this.data.indexOf(slotProps.data) + 1;
        }
    }, 
    mounted() { 
        this.getData(); 
    } 
} 
</script>
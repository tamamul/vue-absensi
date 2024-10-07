<template>
	<div class="grid grid-cols-12 m-5 gap-5" v-if="isLoading">
		<ProgressSpinner />
		<!-- <Skeleton height="50vh" width="100%" class="col-span-12"></Skeleton> -->
	</div>
	<div class="grid grid-cols-12 m-5 gap-5" v-else>
		<Card class="col-span-12 shadow-md">
			<template #title>
				<div class="flex justify-between">
                    <h3>
						Data Shift Kerja
					</h3>
                    <div class="flex gap-2">
                        <RouterLink to="/shift-kerja/tambah">
                            <Button icon="pi pi-plus-circle" label="Tambah Shift Kerja"></Button>
                        </RouterLink>
                        <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                    </div>
                </div>
			</template>
			<template #content>
				<DataTable 
					:value="dataShift"
					paginator  
                    :rows="10" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                    scrollable 
                    tableStyle="min-width: 50rem"
				>
					<Column field="id_pegawai" header="No" />
                    <Column field="nama_lengkap" header="Nama" style="min-width: 300px" class="capitalize" />
					<Column field="" header="Action" frozen alignFrozen="right">
                        <template #body="slotProps">
                            <div class="flex gap-2 bg-white">
                                <Button icon="pi pi-trash" severity="danger" aria-label="Notification" @click="delete($event, slotProps.data.id_pegawai)" />
                                <Button icon="pi pi-pencil" severity="info" aria-label="Notification" @click="edit(slotProps.data.id_pegawai)" />
                            </div>
                        </template>
                    </Column>
				</DataTable>
			</template>
		</Card>
	</div>
</template>

<script>
export default {
	name:'ShiftKerja',
	inject:['default'],
	data() {
		return {
			isLoading: false,
			dataShift: []
		}
	},
	methods: {
		async getShift() {
			await axios.get('shift', {
				headers: {
					'Authorization': `Bearer ${this.default.token}`
				}
			}).then((res) => {
				console.log(res)
			}).catch((err) => {
				console.log(err)
			})
		},
		async getPegawaiAll() {
            await axios.get('pegawai', {
                headers: {
                    'Authorization': `Bearer ${this.default.token}`
                }
            }).then((res) => {
				console.log(res)
                this.isLoading = false
            }).catch((err) => {
				console.log(err)
                router.push({name : 'not-found'})
            })
        },
	},
	mounted() {
		this.getShift()
	},
}
</script>
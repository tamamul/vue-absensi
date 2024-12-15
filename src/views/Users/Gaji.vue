<template>
	<div class="grid grid-cols-12 m-5 gap-5 mb-24 lg:mb-5" v-if="isLoading">
		<Skeleton height="50vh" width="100%" class="col-span-12"></Skeleton>
	</div>
	<div class="grid grid-cols-12 m-5 gap-5" v-else>
		<Card class="col-span-12 xl:col-span-8 shadow-md">
			<template #title>
				<div class="flex justify-between">
                    <h3>
						Data Gaji Pegawai
					</h3>
                    <div class="flex gap-2">
                        <RouterLink to="/gaji/tambah">    
                            <Button icon="pi pi-plus-circle" label="Tambah Gaji"></Button>
                        </RouterLink>
                        <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                    </div>
                </div>
			</template>
			<template #content>
				<DataTable :value="dataGaji"></DataTable>
			</template>
		</Card>
		<Card class="col-span-12 xl:col-span-4 shadow-md">
			<template #title>
				Total Gaji Bulan Ini
			</template>
			<template #content>
				
			</template>
		</Card>
	</div>
</template>

<script>
export default {
	name:'Gaji',
	inject:['default'],
	data() {
		return {
			isLoading: false,
			dataGaji: []
		}
	},
	methods: {
		async getGaji() {
			await axios.get('gaji').then((res) => {
				// console.log(res)
			})
		}
	},
	mounted() {
		this.getGaji()
	},
}
</script>
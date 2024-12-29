<template>
	<Card class="col-span-12 shadow-md">
		<template #title>
			Data Payroll
		</template>
		<template #content>
			<TableDefault
				:columns="columns"
				:dataLuar="dataPayroll"
				api="/user/payroll"
				id="id_payroll"
			/>
		</template>
	</Card>
</template>

<script>
export default {
	name:'CardPayroll',
	inject:['default'],
	data() {
		return {
			dataPayroll: [],
			columns: [
                { field: "nama_pegawai", header: "Nama Pegawai" },
                { field: "periode", header: "Periode" },
                { field: "total_gaji", header: "Total Gaji" },
            ],
		}
	},
	methods: {
		async getPayroll() {
            await axios
                .get("/user/payroll")
                .then((res) => {
                    // console.log(res.data.data)
                    this.dataPayroll = res.data.data;
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
	},
	mounted() {
		this.getPayroll();
	},
}
</script>
<template>
	<Card class="col-span-12 shadow-md">
		<template #title>
			Histori Kehadiran
			<!-- <div class="mt-4 flex items-center justify-start">
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
			</div> -->
		</template>
		<template #content>
			<TableDefault
                    :columns="columns"
                    api="/user/kehadiran"
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
                </TableDefault>
		</template>
	</Card>
</template>

<script>
export default {
	name:'CardHistoriKehadiran',
	data() {
		return {
			data: [],
			date: new Date(),
			columns: [
                { field: "nama_pegawai", header: "Nama Pegawai" },
                { field: "status", header: "Status Kehadiran" },
                { field: "jam_masuk", header: "Jam Masuk" },
                { field: "jam_keluar", header: "Jam Keluar" },
            ],
			loadingTable: true
		}
	},
	methods: {
		formattedDate,
		async created(date) {
			try {
				this.data = !date ? await getData("/user/kehadiran") : await getData(`/kehadiran?tgl_kehadiran=${date}`);
				console.log(this.data)
				this.loadingTable = false;
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		},
		getDataKehadiran(date) {
			this.loadingTable = !this.loadingTable;

			this.created(this.formattedDate(date));
		},
	},
	mounted() {
		this.created();
	},
}
</script>
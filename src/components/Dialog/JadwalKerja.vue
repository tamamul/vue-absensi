<template>
	<Dialog :visible="visible" modal header="Tambahkan Jadwal Kerja" :style="{ width: '40rem' }">
		<template #container>
			<!-- <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ pesan }}</span> -->
			<form class="p-7 grid grid-cols-12">
				<p class="col-span-12 text-xl mb-6 font-semibold">Tambahkan Jadwal Kerja</p>
				<div class="col-span-12 w-full gap-1">
					<InputVuelidate name="nama_jadwal" label="Nama Jadwal" :hasValidated="hasValidated">
						<InputText id="nama_jadwal" v-model="nama_jadwal" class="col-span-12 max-h-[46px]" :invalid="hasValidated && v$.nama_jadwal.$invalid" />
					</InputVuelidate>
				</div>

				<div class="col-span-12 flex justify-center overflow-x-auto mb-3 gap-2">
					<BtnJadwalKerja hari="Senin"	@openShift="openShift('Senin')" />
					<BtnJadwalKerja hari="Selasa"	@openShift="openShift('Selasa')" />
					<BtnJadwalKerja hari="Rabu"		@openShift="openShift('Rabu')" />
					<BtnJadwalKerja hari="Kamis"	@openShift="openShift('Kamis')" />
					<BtnJadwalKerja hari="Jum'at"	@openShift="openShift('Jumat')" />
					<BtnJadwalKerja hari="Sabtu"	@openShift="openShift('Sabtu')" />
					<BtnJadwalKerja hari="Minggu"	@openShift="openShift('Minggu')" />
				</div>

				<div class="col-span-12 w-full overflow-y-auto flex flex-col gap-2 mb-3">
					<p>Pilih Shift Kerja</p>
					<div v-for="item in data" :key="item.id_shift">
						<p>Hari : {{ item.hari }}</p>
						<Shift :api="`shift/${selectedShiftId}`" />
					</div>
				</div>

				<div class="col-span-12 flex justify-end gap-2">
					<Button type="button" label="Cancel" severity="secondary" @click="$emit('toggle')"></Button>
					<Button type="button" label="Save" @click="post()"></Button>
				</div>
			</form>
		</template>
	</Dialog>

	<Dialog v-model:visible="visibleShift" modal header="Pilih Shift Kerja" :style="{ width: '30rem' }">
		<div class="flex flex-col gap-2 mb-3">
			<AddShift
				v-for		 = "item in shift" 
				:key		 = "item.id_shift"
				:id			 = "item.id_shift"
				:nama_shift	 = "item.nama_shift"
				:warna		 = "item.warna"
				:jam_masuk	 = "item.jam_masuk"
				:jam_keluar	 = "item.jam_keluar"
				@click 		 = "selectShift(item.nama_shift, item.id_shift)"
			/>
		</div>

		<div class="flex justify-end gap-2">
			<Button type="button" label="Cancel" severity="secondary" @click="visibleShift = false"></Button>
		</div>
	</Dialog>
</template>

<script>
import { required } from '@vuelidate/validators';

export default {
	name: 'DialogJadwalKerja',
	inject: ['default'],
	props: {
		visible: Boolean,
		is_default: {
			type: Boolean,
			required: false,
			default: false
		},
	},
	emits: ['toggle'],
	data() {
		return {
			data: [],
			shift: [],
			hari: '',
			visibleShift: false,
			selectedShift: null,
			selectedShiftId: null,
			nama_jadwal: '',
			hasValidated: false
		};
	},
	validations() {
		return {
			nama_jadwal: { required },
		};
	},
	watch: {
		data: 'updateData',
		selectedShift: 'updateData',
		nama_jadwal: 'updateData'
	},
	methods: {
		selectShift(nama_shift, id_shift) {
			this.selectedShift = nama_shift;
			this.selectedShiftId = id_shift;
			this.visibleShift = !this.visibleShift
		},
		openShift(hari) {
			this.hari = hari;
			this.visibleShift = !this.visibleShift
		},
		updateData() {
			const temp = {
				hari: this.hari,
				id_shift: this.selectedShiftId,
			}
			const existingIndex = this.data.findIndex(item => item.hari === this.hari);

			if (existingIndex !== -1) {
				this.data[existingIndex] = temp;
			} else {
				this.data.push(temp);
			}
		},
		async getAllShift() {
			await axios.get('shift').then((res) => {
				this.isLoading = false
				this.shift = res.data.data
				// console.log(res.data.data)
			}).catch((err) => {
				console.log(err)
			})
		},
		async postJadwalKerja() {
			const data = {
				nama_jadwal: this.nama_jadwal,
				jadwal: this.data
			}
			await axios.post('jadwal', data).then((res) => {
				this.visibleShift = false
				this.$toast.add({ severity: 'success', summary: 'Jadwal kerja berhasil ditambahkan!', detail: `Menambahkan jadwal kerja ${res.data.data.nama_jadwal}`, life: 5000 })
			}).catch((err) => {
				this.$toast.add({ severity: 'error', summary: 'Jadwal kerja gagal ditambahkan!', detail: `Gagal menambahkan jadwal kerja`, life: 5000 });
				this.visibleShift = false
				console.log(err)
			})
		},
		async postJadwalKerjaDefault() {
			const data = {
				nama_jadwal: this.nama_jadwal,
				is_default: true,
				jadwal: this.data
			}
			await axios.post('jadwal', data).then((res) => {
				// console.log(res)
				this.visibleShift = false
				this.$toast.add({ severity: 'success', summary: 'Jadwal kerja berhasil ditambahkan!', detail: `Menambahkan jadwal kerja ${res.data.data.nama_jadwal}`, life: 5000 })
			}).catch((err) => {
				console.log(err)
				this.visibleShift = false
				this.$toast.add({ severity: 'error', summary: 'Jadwal kerja gagal ditambahkan!', detail: `Gagal menambahkan jadwal kerja`, life: 5000 });
			})
		},
		post() {
			console.log(this.is_default)
			this.is_default ? this.postJadwalKerjaDefault() : this.postJadwalKerja()
		}
	},
	mounted() {
		this.getAllShift()
	}
};
</script>

<template>
	<Dialog :visible="visible" modal header="Tambahkan Jadwal Kerja" :style="{ width: '40rem' }">
		<template #container>
			<!-- <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ pesan }}</span> -->
			<form class="p-7">
				<p class="text-xl mb-6 font-semibold">Tambahkan Jadwal Kerja</p>
				<div class="gap-1">
					<label class="max-h-6 col-span-12" for="nama_jadwal">Nama Jadwal <span class="text-red-500">*</span></label>
					<InputText 
						id="nama_jadwal" 
						v-model="nama_jadwal" 
						class="w-full max-h-[46px]" 
						:invalid="hasValidated && v$.nama_jadwal.$invalid" 
					/>
					<small v-if="hasValidated && v$.nama_jadwal.$error" class="text-red-500 w-full">Wajib Diisi</small>
					<small v-else class="invisible">...</small>
				</div>
				
				<div class="flex overflow-x-auto mb-3 gap-2">
					<!-- <SelectButton 
						v-model="value" 
						:options="options" 
						optionLabel="name" 
						optionValue="value"
						multiple 
						aria-labelledby="multiple" 
					/> -->
						<BtnJadwalKerja hari="Senin"	@openShift="openShift('Senin')" />
						<BtnJadwalKerja hari="Selasa"	@openShift="openShift('Selasa')" />
						<BtnJadwalKerja hari="Rabu"		@openShift="openShift('Rabu')" />
						<BtnJadwalKerja hari="Kamis"	@openShift="openShift('Kamis')" />
						<BtnJadwalKerja hari="Jum'at"	@openShift="openShift('Jum\'at')" />
						<BtnJadwalKerja hari="Sabtu"	@openShift="openShift('Sabtu')" />
						<BtnJadwalKerja hari="Minggu"	@openShift="openShift('Minggu')" />
				</div>

				<div class="w-full overflow-y-auto flex flex-col gap-2 mb-3">
					<p>Pilih Shift Kerja</p>
					<div v-for="item in data" :key="item.id_shift">
						<p>Hari : {{ item.hari }}</p>
						<Shift :api="`shift/${selectedShiftId}`" />
					</div>
				</div>

				<div class="flex justify-end gap-2">
					<Button type="button" label="Cancel" severity="secondary" @click="$emit('toggle')"></Button>
					<Button type="button" label="Save" @click="postJadwalKerja"></Button>
				</div>
			</form>
		</template>
	</Dialog>

	<Dialog v-model:visible="visibleShift" modal header="Pilih Shift Kerja" :style="{ width: '30rem' }">
		<div class="flex flex-col gap-2">
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
	</Dialog>
</template>

<script>
import { required } from '@vuelidate/validators';

export default {
	name: 'DialogJadwalKerja',
	inject: ['default'],
	props: {
		visible: Boolean,
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
				console.log(res.data.data)
			}).catch((err) => {
				console.log(err)
			})
		},
		async postJadwalKerja() {
			const data = {
				nama_jadwal: this.selectedShift,
				jadwal: this.data
			}
			console.log(data)
			await axios.post('jadwal', data).then((res) => {
				console.log(res)
			}).catch((err) => {
				console.log(err)
			})
		}
	},
	mounted() {
		this.getAllShift()
	}
};
</script>

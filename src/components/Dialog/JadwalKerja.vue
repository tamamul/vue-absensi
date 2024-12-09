<template>
	<Dialog :visible="visible" modal header="Tambahkan Jadwal Kerja" :style="{ width: '40rem' }">
		<span class="text-surface-500 dark:text-surface-400 block mb-8">{{ pesan }}</span>
		<form>
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
			
			<div class="flex w-full overflow-x-auto mb-3">
				<SelectButton 
					v-model="value" 
					:options="options" 
					optionLabel="name" 
					optionValue="value"
					multiple 
					aria-labelledby="multiple" 
				/>
			</div>

			<div class="w-full overflow-y-auto flex flex-col gap-2 mb-3">
				<h3>Daftar Shift Kerja</h3>
				<AddShift
					v-for		 = "item in shift" 
					:key		 = "item.id_shift"
					:id			 = "item.id_shift"
					:nama_shift	 = "item.nama_shift"
					:warna		 = "item.warna"
					:jam_masuk	 = "item.jam_masuk"
					:jam_keluar	 = "item.jam_keluar"
					@click 		 = "selectShift(item.nama_shift)"
				/>
			</div>

			<div class="flex justify-end gap-2">
				<Button type="button" label="Cancel" severity="secondary" @click="$emit('toggle')"></Button>
				<Button type="button" label="Save" @click="$emit('toggle')"></Button>
			</div>
		</form>
	</Dialog>
</template>

<script>
import { required } from '@vuelidate/validators';

export default {
	name: 'DialogJadwalKerja',
	inject: ['default'],
	props: {
		visible: Boolean,
		shift: Array
	},
	emits: ['toggle'],
	data() {
		return {
			value: [],
			pesan: 'Pilih hari dan shift kerja.',
			selectedShift: null,
			options: [
				{ name: 'Senin', 	value: 'Senin' 	},
				{ name: 'Selasa', 	value: 'Selasa' },
				{ name: 'Rabu', 	value: 'Rabu' 	},
				{ name: 'Kamis', 	value: 'Kamis' 	},
				{ name: "Jum'at", 	value: "Jum'at" },
				{ name: 'Sabtu', 	value: 'Sabtu' 	},
				{ name: 'Minggu', 	value: 'Minggu' },
			],
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
		value: 'updatePesan',
		selectedShift: 'updatePesan',
		nama_jadwal: 'updatePesan'
	},
	methods: {
		selectShift(nama_shift) {
			this.selectedShift = nama_shift;
		},
		updatePesan() {
			const namaJadwal = this.nama_jadwal || '[Belum Ada Jadwal]';
			const hari = this.value.join(', ').toLowerCase();
			const shift = this.selectedShift ? `menggunakan shift kerja ${this.selectedShift}` : '';
			
			this.pesan = namaJadwal && hari && shift 
				? `${namaJadwal} berlaku dari hari ${hari} ${shift}.`
				: 'Pilih hari dan shift kerja.';
		}
	}
};
</script>

<template>
	<Dialog :visible="visible" modal header="Edit Profile" :style="{ width: '50rem' }">
		<span class="text-surface-500 dark:text-surface-400 block mb-8">Pilih pegawai dan jadwal kerja yang ingin digunakan.</span>
		<form class="">
			<InputVuelidate name="nama_lengkap" label="Pilih Pegawai" :hasValidated="hasValidated">
				<Select class="col-span-12" v-model="pegawai" :options="daftarPegawai" optionLabel="nama_lengkap" :loading="loadingPegawai" :placeholder="phPegawai" filter />
			</InputVuelidate>
			<InputVuelidate name="nama_jadwal" label="Pilih Pegawai" :hasValidated="hasValidated">
				<Select class="col-span-12" v-model="jadwalKerja" :options="daftarJadwalkerja" optionLabel="nama_jadwal" :loading="loadingJadwalKerja" :placeholder="phJadwalKerja" filter />
			</InputVuelidate>
		</form>

		<div class="flex justify-end gap-2">
			<Button type="button" label="Cancel" severity="secondary" @click="toggle"></Button>
			<Button type="button" label="Save" @click="post"></Button>
		</div>
	</Dialog>
</template>

<script>
export default {
	name:'DialogJadwalPegawai',
	inject:['default'],
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['toggle'],
	data() {
		return {
			pegawai: null,
            daftarPegawai: null,
			phPegawai: 'Loading...',
			loadingPegawai: true,
			
			jadwalKerja : null,
			daftarJadwalkerja: null,
			phJadwalKerja: 'Loading...',
			loadingJadwalKerja: true,
		}
	},
	methods: {
		toggle() {
			this.$emit('toggle')
		},
		async post() {
			const data = {
				id_pegawai: this.pegawai.id,
				id_jadwal: this.jadwalKerja.id
			}

			await axios.put('/jadwal/pegawai').then((res)=>{
				this.$toast.add({
					severity: 'success',
					summary: 'Success',
					detail: res.data.message,
					life: 3000
				})
				console.log(res)
			}).catch((err)=>{
				this.$toast.add({
					severity: 'error',
					summary: 'Error',
					detail: err,
					life: 3000
				})
			})
		},
		async getPegawaiAll() {
            try {
                const res = await axios.get('pegawai');
                this.daftarPegawai = res.data.data;
                this.loadingPegawai = false;
				this.phPegawai = 'Pilih pegawai'
            } catch (err) {
				console.log("Error:" + err);
				this.phPegawai = 'Error'
                this.loadingPegawai = false;
            }
        },
		async getJadwalKerja() {
			await axios.get('jadwal').then((res) => {
				this.daftarJadwalkerja = res.data.data
				this.loadingJadwalKerja = false
				this.phJadwalKerja = 'Pilih Jadwal Kerja'
			}).catch((err) => {
				console.log("Error:" + err);
				this.phJadwalKerja = 'Error'
			})
		},
	},
	mounted() {
		this.getPegawaiAll()
		this.getJadwalKerja()
	}
}
</script>
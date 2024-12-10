<template>
	<div v-if="loading"></div>
	<div 
		v-else
		:style="{ backgroundColor: data.warna }"
		class="rounded-md text-white py-3 px-3 flex justify-between items-center"
	>
		<div>
			{{ data.nama_shift }}
		</div>

		<div class="flex items-center gap-2">
			<i class="pi pi-clock"></i>
			<p>{{ data.jam_masuk }}-{{ data.jam_keluar }}</p>
			<Button aria-controls="overlay_tmenu" icon="" unstyled class="flex justify-center items-center" />
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Shift',
	props: {
		api: String
	},
	data() {
		return {
			data: [],
			loading: true
		}
	},
	methods: {
		async getShift() {
			await axios.get(this.api).then(res => {
				this.data = res.data.data
				this.loading = false
			}).catch(err => {
				console.log(err)
			})
		}
	},
	mounted() {
		this.getShift()
	}
};
</script>
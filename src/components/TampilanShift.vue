<template>
	<div 
		:style="{ backgroundColor: warna }" 
		class="rounded-md text-white py-3 mb-4 px-3 flex justify-between"
	>
		<div>
			{{ nama_shift }}
		</div>

		<div class="flex items-center gap-2">
			<i class="pi pi-clock"></i>
			<p>{{ formattedTime(jam_masuk) }}-{{ formattedTime(jam_keluar) }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name:'TampilanShift',
	props: {
		warna		: String,
		nama_shift	: String,
		jam_masuk	: String,
		jam_keluar	: String,
		jam_istirahat_mulai		: String,
		jam_istirahat_selesai	: String,
		toleransi_keterlambatan	: String,
	},
	data() {
		return {
		}
	},
	methods: {
	},
	mounted() {
	},
}
</script>
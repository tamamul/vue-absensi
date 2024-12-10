<template>
	<div 
		:style="{ backgroundColor: warna }"
		class="rounded-md text-white py-3 px-3 flex justify-between items-center cursor-pointer"
	>
		<div>
			{{ nama_shift }}
		</div>

		<div class="flex items-center gap-2">
			<i class="pi pi-clock"></i>
			<p>{{ jam_masuk }}-{{ jam_keluar }}</p>
			<Button aria-controls="overlay_tmenu" icon="" unstyled class="flex justify-center items-center" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'AddShift',
	props: {
		id			: Number,
		nama_shift	: String,
		warna		: String,
		jam_masuk	: String,
		jam_keluar	: String,
	},
};
</script>
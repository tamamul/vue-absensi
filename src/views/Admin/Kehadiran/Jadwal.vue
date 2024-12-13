<template>
	<div class="grid grid-cols-12 m-5 gap-5 mb-24 lg:mb-5">
		<CardJadwalPegawai></CardJadwalPegawai>

		<CardShift></CardShift>

		<CardJadwalKerja></CardJadwalKerja>
	</div>

</template>

<script>
export default {
	name:'ShiftKerja',
	inject:['default'],
	data() {
		return {
		}
	},
	methods: {
		formattedTime,
	},
}
</script>

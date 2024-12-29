<template>
	<div class="grid grid-cols-12 m-5 gap-5 mb-24 lg:mb-5">
        <PageHeader title="Jadwal" />

		<CardJadwalPegawai />

		<CardShift />

		<CardJadwalKerja />
	</div>
</template>

<script>
export default {
	name:'Jadwal',
}
</script>

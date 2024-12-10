<template>
	<Button :label="hari" @click="$emit('openShift')" />
</template>

<script>
export default {
	props: ['hari'],
	emits: ['openShift'],
	name:'BtnJadwalKerja',
	inject:['default'],
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
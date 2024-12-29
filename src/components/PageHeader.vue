<template>
	<h2 class="col-span-12 font-semibold text-2xl text-[#334155]">{{ title }}</h2>
</template>

<script>
export default {
	name:'PageHeader',
	props:{
		title: String,
	},
	data() {
		return {
			home: "pi pi-home",
		}
	},
}
</script>
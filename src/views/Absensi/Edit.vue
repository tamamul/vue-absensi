<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>
</template>

<script>
export default {
	name:'',
	inject:['default'],
	data() {
		return {
			isLoading: true
		}
	},
	methods: {
	},
	mounted() {
	},
}
</script>
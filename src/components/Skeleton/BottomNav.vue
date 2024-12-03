<template>
	<div class="shadow-md h-20 block lg:hidden fixed bg-white w-full bottom-0 z-50">
		<div class="flex gap-4 items-center justify-around h-full">
			<div v-for="item in 3" :key="item" class="flex flex-col gap-2 items-center justify-center ">
				<Skeleton height="3rem" width="3rem"></Skeleton>
				<Skeleton height="0.5rem" width="5rem"></Skeleton>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:'SkeletonBottomNav',
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
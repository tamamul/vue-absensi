<template>
	<Dialog :visible="test" modal header="Edit Profile" :style="{ width: '25rem' }">
		<span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
		<div class="flex items-center gap-4 mb-4">
			<label for="username" class="font-semibold w-24">Username</label>
			<InputText id="username" class="flex-auto" autocomplete="off" />
		</div>
		<div class="flex items-center gap-4 mb-8">
			<label for="email" class="font-semibold w-24">Email</label>
			<InputText id="email" class="flex-auto" autocomplete="off" />
		</div>
		<div class="flex justify-end gap-2">
			<Button type="button" label="Cancel" severity="secondary" @click="toggle"></Button>
			<Button type="button" label="Save" @click="toggle"></Button>
		</div>
	</Dialog>
</template>

<script>
export default {
	name:'DialogJadwalKerja',
	inject:['default'],
	props: {
		test: Boolean,
	},
	emits:[
		'toggle'
	],
	data() {
		return {
		}
	},
	methods: {
	},
	mounted() {
		console.log('hola')
	},
}
</script>
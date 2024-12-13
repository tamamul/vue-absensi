<template>
	<Dialog :visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
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
			<Button type="button" label="Cancel" severity="secondary" @click="toggle()"></Button>
			<Button type="button" label="Save" @click="toggle()"></Button>
		</div>
	</Dialog>
</template>

<script>
export default {
	name:'DialogJadwalPegawai',
	inject:['default'],
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['toggle'],
	data() {
		return {
		}
	},
	methods: {
		toggle() {
			this.$emit('toggle')
		}
	},
	mounted() {
	},
}
</script>
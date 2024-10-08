<template>
    <ConfirmDialog />
	<div 
		:style="{ backgroundColor: warna }" 
		class="rounded-md text-white py-3 px-3 flex justify-between items-center"
	>
		<div>
			{{ nama_shift }}
		</div>

		<div class="flex items-center gap-2">
			<i class="pi pi-clock"></i>
			<p>{{ jam_masuk }}-{{ jam_keluar }}</p>
			<Button @click="toggle" aria-controls="overlay_tmenu" icon="pi pi-ellipsis-v" unstyled class="flex justify-center items-center" />
		</div>
	</div>

	<TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup>
		<template #item="{ item, props }">
			<div @click="item.theFunction" v-ripple class="flex items-center" v-bind="props.action">
				<span :class="item.icon"></span>
				<span class="ml-2">{{ item.label }}</span>
			</div>
		</template>
	</TieredMenu>
</template>

<script>
export default {
	name: 'TampilanShift',
	props: {
		deleteConf	: Boolean,
		id			: Number,
		nama_shift	: String,
		warna		: String,
		jam_masuk	: String,
		jam_keluar	: String,
	},
	emits: ['editShift', 'deleteShift'],
	data() {
		return {
			items: [
				{
					label: 'Edit',
					icon: 'pi pi-pencil',
					theFunction: () => this.editShift(this.id),
				},
				{
					label: 'Delete',
					icon: 'pi pi-trash',
					theFunction: () => this.deleteShift(this.id),
				},
			],
		};
	},

	methods: {
		editShift(id) {
			this.$emit('editShift', id)
		},
		deleteShift(id) {
            this.$confirm.require({
                message: 'Are you sure you want to sdfdsfdsproceed?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                rejectProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Save'
                },
                accept: () => {
                    this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });
			this.$emit('deleteShift', id)
			this.deleteConf = true
		},
        toggle(event) {
            this.$refs.menu.toggle(event)
        }
	},
};
</script>

<style>
.p-tieredmenu-root-list, .p-tieredmenu-submenu{
	padding: 0.25rem;
}
</style>

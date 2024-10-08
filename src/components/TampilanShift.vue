<template>
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
			this.$emit('editShift', id);
		},
		deleteShift(id) {
			this.$emit('deleteShift', id);
		},
        toggle(event) {
            this.$refs.menu.toggle(event);
        }
	},
};
</script>

<style>
.p-tieredmenu-root-list, .p-tieredmenu-submenu{
	padding: 0.25rem;
}
</style>

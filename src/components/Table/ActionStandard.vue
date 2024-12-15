<template>
	<div class="flex gap-2 bg-white">
		<Button 
			icon="pi pi-pencil" 
			severity="info" 
			aria-label="Edit" 
			@click="$emit('edit', id)" 
		/>
		<Button 
			icon="pi pi-trash" 
			severity="danger" 
			aria-label="Delete" 
			@click="$emit('delete', id)"
		/>
	</div>
</template>

<script>
export default {
	name: 'TableActionStandard',
	props: {
		id: {
			type: Number,
			required: true
		}
	}
};
</script>

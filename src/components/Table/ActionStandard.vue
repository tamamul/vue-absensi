<template>
    <div class="flex gap-2 bg-white">
        <Button
            icon="pi pi-pencil"
            severity="info"
            aria-label="Edit"
            @click="$emit('edit', id)"
        />
        <Button
            @click="confirmDelete($event)"
            icon="pi pi-trash"
            aria-label="Delete"
            severity="danger"
            class="bg-red-500 text-white"
            outlined
        ></Button>
    </div>
</template>

<script>
export default {
    name: "TableActionStandard",
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    methods: {
        confirmDelete(event) {
            this.$confirm.require({
                target: event.currentTarget,
                message: "Do you want to delete this data?",
                icon: "pi pi-info-circle",
                rejectProps: {
                    label: "Cancel",
                    severity: "secondary",
                    outlined: true,
                },
                acceptProps: {
                    label: "Delete",
                    severity: "danger",
                },
                accept: () => {
                    this.$emit("delete", this.id);
                    this.$toast.add({
                        severity: "info",
                        summary: "Confirmed",
                        detail: "Data berhasl dihapus.",
                        life: 3000,
                    });
                },
                reject: () => {
                    this.$toast.add({
                        severity: "error",
                        summary: "Rejected",
                        detail: "You have rejected",
                        life: 3000,
                    });
                },
            });
        },
    },
};
</script>

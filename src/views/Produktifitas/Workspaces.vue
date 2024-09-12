<template>
    <Layout>
        <!-- Title -->
        <div class="col-span-12 flex items-center gap-14">
            <h2 class="font-medium text-3xl text-def">Workspaces</h2>
            <div class="flex gap-3">
                <Button icon="pi pi-plus" label="Tambah" @click="visible = true" />
                <!-- <Button icon="pi pi-upload" label="Update" @click="update()" /> -->
            </div>
        </div>

        <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-4">
            <template #title>Absensi</template>
            <template #content>
                <div v-for="item in workspaces" :key="item.nama">
                    <RouterLink :to="item.route">
                        <Button :label="item.nama"></Button>
                    </RouterLink>
                </div>
            </template>
        </Card>
    </Layout>
</template>

<script>
export default {
    data() {
        return {
            workspaces: [
                {
                    nama: "Frontend",
                    route: "/produktifitas/frontend/"
                }
            ]
        }
    },
}
</script>

<style>

</style>
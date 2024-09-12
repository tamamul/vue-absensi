<template>
    <Layout>        
        <!-- Title -->
        <div class="col-span-12 flex items-center gap-14">
            <h2 class="font-medium text-3xl text-def">Daftar Tugas Bulan Ini</h2>
            <div class="flex gap-3">
                <Button icon="pi pi-plus" label="Tambah Tugas" @click="visible = true" />
                <Button icon="pi pi-upload" label="Update" @click="update()" />
            </div>
        </div>

        <!-- Kanban cards -->
        <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
            <template #title>To do's</template>

            <!-- Card To do's  -->
            <template #content>
                <draggable 
                    v-model="kanban.todo" 
                    group="tasks" 
                    @start="drag=true" 
                    @end="drag=false" 
                    item-key="id"
                    class="flex flex-col gap-5"
                >
                    <template #item="{element}">
                        <Card class="shadow-md border-l-yellow-500 border-l-8">
                            <template #title>
                                <div class="grid grid-cols-12 gap-5">
                                    <div class="col-span-10 font-medium">{{element.name}}</div>
                                    <div class="col-span-2">
                                        <Button type="button" icon="pi pi-ellipsis-h" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" text severity="secondary" />
                                        <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
                                    </div>
                                </div>
                            </template>
                            <template #content>
                                {{element.deskripsi}}
                            </template>
                        </Card>
                    </template>
                </draggable>
            </template>
        </Card>

        <!-- Card In Progress  -->
        <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
            <template #title>In Progress</template>

            <template #content>
                <draggable 
                    v-model="kanban.inProgress" 
                    group="tasks" 
                    @start="drag=true" 
                    @end="drag=false" 
                    item-key="id"
                    class="flex flex-col gap-5"
                >
                    <template #item="{element}">
                        <Card class="shadow-md border-l-blue-500 border-l-8">
                            <template #title>
                                <div class="grid grid-cols-12 gap-5">
                                    <div class="col-span-10 font-medium">{{element.name}}</div>
                                    <div class="col-span-2">
                                        <Button type="button" icon="pi pi-ellipsis-h" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" text severity="secondary" />
                                        <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
                                    </div>
                                </div>
                            </template>
                            <template #content>
                                {{element.deskripsi}}
                            </template>
                        </Card>
                    </template>
                </draggable>
            </template>
        </Card>

        <!-- Card Trial error  -->
        <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
            <template #title>Trial Error</template>    

            <template #content>         
                <draggable 
                    v-model="kanban.trialError" 
                    group="tasks" 
                    @start="drag=true" 
                    @end="drag=false" 
                    item-key="id"
                    class="flex flex-col gap-5"
                >
                    <template #item="{element}">
                        <Card class="shadow-md border-l-red-700 border-l-8">
                            <template #title>
                                <div class="grid grid-cols-12 gap-5">
                                    <div class="col-span-10 font-medium">{{element.name}}</div>
                                    <div class="col-span-2">
                                        <Button type="button" icon="pi pi-ellipsis-h" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" text severity="secondary" />
                                        <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
                                    </div>
                                </div>
                            </template>
                            <template #content>
                                {{element.deskripsi}}
                            </template>
                        </Card>
                    </template>
                </draggable>
            </template>
        </Card>

        <!-- Card Coompleted  -->
        <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
            <template #title>Completed</template>    

            <template #content>         
                <draggable 
                    v-model="kanban.completed" 
                    group="tasks" 
                    @start="drag=true" 
                    @end="drag=false" 
                    item-key="id"
                    class="flex flex-col gap-5"
                >
                    <template #item="{element}">
                        <Card class="shadow-md border-l-lime-300 border-l-8">
                            <template #title>
                                <div class="grid grid-cols-12 gap-5">
                                    <div class="col-span-10 font-medium">{{element.name}}</div>
                                    <div class="col-span-2">
                                        <Button type="button" icon="pi pi-ellipsis-h" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" text severity="secondary" />
                                        <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
                                    </div>
                                </div>
                            </template>
                            <template #content>
                                {{element.deskripsi}}
                            </template>
                        </Card>
                    </template>
                </draggable>
            </template>
        </Card>

        <!-- Modal untuk upload task baru -->
        <Dialog v-model:visible="visible" modal header="Tambahkan Tugas" :style="{ width: '32rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Tambahkan list tugas untuk bulan ini.</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="nama" class="font-semibold w-24">Judul Tugas</label>
                <InputText id="nama" class="flex-auto" autocomplete="off" v-model="formKanban.name" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="deskripsi" class="font-semibold w-24">Deskripsi</label>
                <InputText id="deskripsi" class="flex-auto" autocomplete="off" v-model="formKanban.deskripsi" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="postTask()"></Button>
            </div>
        </Dialog>

        <!-- Roti -->
        <Toast />
    </Layout>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable
    },
    data() {
        return {
            // ? Data kanban yang di fetch dari di getKanban()
            kanban: {
                todo        : [],
                inProgress  : [],
                trialError  : [],
                completed   : []
            },

            // ? Untuk Tracking kanban yang di klik
            currentElement  : '',
            currentTask     : null,
            editingTaskId   : null,
            editingElement  : null,

            // ? Menampilkan modal tambah aplikasi
            visible: false,

            // ? Form untuk tambah task
            formKanban: {
                name: '',
                deskripsi: ''
            },

            // ? menu popup untuk edit or delete kanban
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-pencil'
                },
                {
                    separator: true
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-trash'
                }
            ],
        }
    },
    methods: {
        // ? Get kanban
        async getKanban() {
            try {
                const response = await fetch("http://localhost:3000/kanban");
                const kanban = await response.json();
                this.kanban = kanban  
            } catch (error) {
                console.error('Error:', error);
            }
        },

        // ? Push To Object List 1
        async postTask() {
            try {
                this.kanban.todo.push({ 
                    name: this.formKanban.name, 
                    deskripsi: this.formKanban.deskripsi 
                });
                this.visible = false;
                this.formKanban.name = '';
                this.formKanban.deskripsi = '';
                this.$toast.add({ severity: 'success', summary: `Menambahkan tugas baru`, detail: 'Tugas telah ditambah', life: 3000 });

                const response = await fetch("http://localhost:3000/kanban", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.kanban)
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
                this.$toast.add({ severity: 'error', summary: 'Tugas gagal ditambahkan', detail: 'Network response was not ok', life: 3000 });
            }
        },

        // ? Update all objects kanban
        async update() {
            try {
                const response = await fetch("http://localhost:3000/kanban", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.kanban)
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // const data = await response.json();
                this.$toast.add({ severity: 'success', summary: 'Update', detail: 'Data berhasil di update', life: 3000 });
            } catch (error) {
                console.error('Error:', error);
                this.$toast.add({ severity: 'error', summary: 'Update Gagal', detail: 'Network response was not ok', life: 3000 });
            }
        },

        toggle(event) {
            this.$refs.menu.toggle(event);
        }
    },
    mounted() {
        // ? onload getKanban
        this.getKanban()
    },
}
</script>

<style>
</style>

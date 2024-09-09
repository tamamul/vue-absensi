<template>
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

        <!-- // TODO Card To do's  -->
        <template #content>
            <draggable 
                v-model="kanban.list1" 
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
                                <div class="col-span-10">{{element.name}}</div>
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

    <!-- // ? Card In Progress  -->
    <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
        <template #title>In Progress</template>
        <template #content>
            <draggable 
                v-model="kanban.list2" 
                group="tasks" 
                @start="drag=true" 
                @end="drag=false" 
                item-key="id"
                class="flex flex-col gap-5"
            >
                <template #item="{element}">
                    <Card class="shadow-md border-l-blue-500 border-l-8">
                        <template #title>
                            {{element.name}}
                        </template>
                        <template #content>
                            {{element.deskripsi}}
                        </template>
                    </Card>
                </template>
            </draggable>
        </template>
    </Card>

    <!-- // ! Card Trial error  -->
    <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
        <template #title>Trial Error</template>    
        <template #content>         
            <draggable 
                v-model="kanban.list3" 
                group="tasks" 
                @start="drag=true" 
                @end="drag=false" 
                item-key="id"
                class="flex flex-col gap-5"
            >
                <template #item="{element}">
                    <Card class="shadow-md border-l-red-700 border-l-8">
                        <template #title>
                            {{element.name}}
                        </template>
                        <template #content>
                            {{element.deskripsi}}
                        </template>
                    </Card>
                </template>
            </draggable>
        </template>
    </Card>

    <!-- // * Card Coompleted  -->
    <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
        <template #title>Completed</template>    
        <template #content>         
            <draggable 
                v-model="kanban.list4" 
                group="tasks" 
                @start="drag=true" 
                @end="drag=false" 
                item-key="id"
                class="flex flex-col gap-5"
            >
                <template #item="{element}">
                    <Card class="shadow-md border-l-lime-300 border-l-8">
                        <template #title>
                            {{element.name}}
                        </template>
                        <template #content>
                            {{element.deskripsi}}
                        </template>
                    </Card>
                </template>
            </draggable>
        </template>
    </Card>

    <!-- // ? Modal untuk upload task baru -->
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
            <Button type="button" label="Save" @click="add()"></Button>
        </div>
    </Dialog>

    <!-- // ? Roti -->
    <Toast />
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable
    },
    data() {
        return {
            visible: false,
            drag: false,
            kanban: {
                list1: [],
                list2: [],
                list3: [],
                list4: []
            },
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
        getKanban() {
            const gettingData = async () => {
                const response = await fetch("http://localhost:3000/kanban");
                const kanban = await response.json();
                this.kanban = kanban
            }
            gettingData();
        },

        // ? Push To Object List 1
        add() {
            this.kanban.list1.push({ 
                id: Date.now(),
                name: this.formKanban.name, 
                deskripsi: this.formKanban.deskripsi 
            });
            this.visible = false;
            this.formKanban.name = '';
            this.formKanban.deskripsi = '';
            this.$toast.add({ severity: 'success', summary: `Menambahkan tugas baru`, detail: 'Tugas telah ditambah', life: 3000 });
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
                const data = await response.json();
                this.$toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated', life: 3000 });
            } catch (error) {
                console.error('Error:', error);
                this.$toast.add({ severity: 'error', summary: 'Update Failed', detail: 'Data Update Failed', life: 3000 });
            }
        },
        toggle(event) {
            this.$refs.menu.toggle(event);
        }
    },
    mounted() {
        // ? Run getKanban run load
        this.getKanban()
    },
}
</script>

<style>
</style>

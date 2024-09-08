// TODO buat sesuatu (text) untuk tasks yang done

<template>
    <div class="col-span-12 flex items-center gap-14">
        <h2 class="font-medium text-3xl text-def">Daftar Tugas Bulan Ini</h2>
        <Button icon="pi pi-plus" label="Tambah Tugas" @click="visible = true" />
        <Button icon="pi pi-upload" label="Update" @click="update()" />
    </div>
    <Card class="shadow-md col-span-12 lg:col-span-6 xl:col-span-3">
        <template #title>To do's</template>    
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
                    <Card class="shadow-md">
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
                    <Card class="shadow-md">
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
                    <Card class="shadow-md">
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
                    <Card class="shadow-md">
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

    <Dialog v-model:visible="visible" modal header="Tambahkan Tugas" :style="{ width: '32rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Tambahkan list tugas untuk bulan ini.</span>
        <div class="flex items-center gap-4 mb-4">
            <label for="nama" class="font-semibold w-24">Judul Tugas</label>
            <InputText id="nama" class="flex-auto" autocomplete="off" v-model="nama" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="deskripsi" class="font-semibold w-24">Deskripsi</label>
            <InputText id="deskripsi" class="flex-auto" autocomplete="off" v-model="deskripsi" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="add()"></Button>
        </div>
    </Dialog>
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
            kanban: [],
            formKanban: {
                name: '',
                deskripsi: ''
            },
            items: [
                {
                    label: 'Add',
                    icon: 'pi pi-pencil',
                    command: () => {
                        this.$toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added', life: 3000 });
                    }
                },
                {
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    command: () => {
                        this.$toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated', life: 3000 });
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-trash',
                    command: () => {
                        this.$toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                    }
                },
                {
                    label: 'Upload',
                    icon: 'pi pi-upload',
                    command: () => {
                        this.$router.push('/fileupload');
                    }
                },
                {
                    label: 'Vue Website',
                    icon: 'pi pi-external-link',
                    command: () => {
                        window.location.href = 'https://vuejs.org/';
                    }
                }
            ]
        }
    },
    methods: {
        getKanban() {
            const gettingData = async () => {
                const response = await fetch("http://localhost:3000/kanban");
                const kanban = await response.json();
                this.kanban = kanban
            }
            gettingData();
        },
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
        add() {
            this.kanban.list1.push(this.formKanban);
            this.visible = false
        }
    },
    mounted() {
        this.getKanban()
    },
}
</script>

<style>

</style>
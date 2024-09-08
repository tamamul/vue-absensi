<template>
    <div class="col-span-6 grid grid-cols-12 gap-5 m-5">
        <Card class="dragthing shadow-md col-span-12 lg:col-span-6 xl:col-span-12">
            <template #title>Subscribe</template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quos!</p>
            </template>
        </Card>
        <Card class="dragthing shadow-md col-span-12 lg:col-span-6 xl:col-span-12">
            <template #title>Subscribe</template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quos!</p>
            </template>
        </Card>
        <Card class="dragthing shadow-md col-span-12 lg:col-span-6 xl:col-span-12">
            <template #title>Subscribe</template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quos!</p>
            </template>
        </Card>
    </div>
    <draggable 
        v-model="tasks" 
        group="people" 
        @start="drag=true" 
        @end="drag=false" 
        item-key="id"
    >
        <template #item="{element}">
            <div>{{element.name}}</div>
        </template>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable
    },
    data() {
        return {
            drag: false,
            tasks: [
                {
                    "name": "John",
                    "id": 0
                },
                {
                    "name": "Joao",
                    "id": 1
                },
                {
                    "name": "Jean",
                    "id": 2
                }
            ]
        }
    },
    methods: {
        // init() {
        //     dragula([document.querySelector("#dragparent")])
        // }
    },
    // beforeMount() {
    //     this.init()
    // },
}
</script>

<style>

</style>
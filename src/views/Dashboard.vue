<template>
    <Card class="col-span-12 shadow-md">
        <template #title>
            text
        </template>
        <template #content>
            admin only
            token
        </template>
    </Card>
    <Card class="col-span-12 shadow-md">
        <template #title>
            another one
        </template>
        <template #content>
            User normal only      
        </template>
    </Card>
    <Card class="col-span-12 shadow-md">
        <template #title>
            another one
        </template>
        <template #content>
            both {{ this.default.image }}
        </template>
    </Card>
</template>

<script>

export default {
    name: 'Dashboard',
    inject: ['default'],
    data() {
        return {
        }
    },
};
</script>

<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="!isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>

    <div class="grid grid-cols-12 gap-5 m-5">
        <Card class="col-span-12 shadow-md">
            <template #title>
                Card umum
            </template>
            <template #content>
                Absen Sekarang
            </template>
        </Card>
    </div>

</template>

<script>
export default {
    name: 'AdminDashboard',
    inject: ['default'],
    data() {
        return {
            isLoading: true
        }
    },
    methods: {
    },
};
</script>

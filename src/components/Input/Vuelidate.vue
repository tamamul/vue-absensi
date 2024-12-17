<template>
    <div
        class="col-span-12 lg:col-span-6 xl:col-span-4 grid grid-cols-12 gap-1 justify-end"
    >
        <label class="max-h-6 col-span-12" :for="name"
            >{{ label }} <span class="text-red-500">*</span></label
        >
        <slot />
        <small
            v-if="hasValidated && v$.name.$error"
            class="text-red-500 col-span-12"
            >{{ label + "Wajib Diisi" }}</small
        >
        <small v-else class="invisible">...</small>
    </div>
</template>

<script>
export default {
    name: "InputVuelidate",
    inject: ["default"],
    props: {
        name: String,
        label: String,
        hasValidated: Boolean,
    },
    methods: {},
    mounted() {},
};
</script>

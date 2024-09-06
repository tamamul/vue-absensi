<template>
    <!-- Sidebar -->
    <div v-show="visible" class="w-[300px] sticky border-none rounded-none bg-[#1C2434] text-white">
        <!-- Sidebar Header -->
        <div class="">
            <span class="flex items-center justify-left gap-2 px-6 py-5 lg:py-6">
                <img class="w-[50px]" src="../assets/app-logo.png" alt="">
                <span class="font-semibold text-2xl font-nunito">Absensi QR</span>
            </span>
        </div>

        <!-- Sidebar Menu -->
        <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            <nav class="">

            </nav>
        </div>
    </div>

</template>

<script>
export default {
    props: [
        // visible
    ],
    data() {
        return {
            visible: false
        }
    }
};
</script>

<style>
</style>

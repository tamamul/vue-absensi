<template>
    <div class="grid grid-cols-12 m-5">

        <div class="col-span-12 xl:col-span-6">
            <div class="flex justify-center">
                <Card class="shadow-md w-full">
                    <template #title>
                        Absensi
                    </template>
                    <template #content>
                        <QRCodeVue3
                            :width="500"
                            :height="500"
                            :value="data"
                            :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                            :imageOptions="{ hideBackgroundDots: false, imageSize: 0.4, margin: 0 }"
                            :dotsOptions="{
                                type: 'dots',
                                color: '#000',
                                gradient: {
                                    type: 'linear',
                                    rotation: 0,
                                    colorStops: [
                                        { offset: 0, color: '#000' },
                                        { offset: 1, color: '#000' },
                                    ],
                                },
                            }"
                            :backgroundOptions="{ color: '#ffffff' }"
                            :cornersSquareOptions="{ type: 'dot', color: '#3B82F6' }"
                            :cornersDotOptions="{ type: undefined, color: '#3B82F6' }"
                            fileExt="png"
                            myclass="my-qur flex justify-center"
                            imgclass="img-qr"
                        />
                    </template>
                </Card>
            </div>
        </div>

    </div>
</template>

<script>
import QRCodeVue3 from "qrcode-vue3";

export default {
    name: 'QRCodeVue3Example',
    components: {
        QRCodeVue3
    },
    data() {
        return {
            data: ''
        }
    },
    methods: {
        async getQrCode() {
            await setInterval(() => {
                axios.get('kehadiran/get-kode').then((res) => {
                    console.log(res.data)
                })
            }, 3000);
        }
    },
    created() {
        this.getQrCode()
    },
}
</script>

<style>

</style>
<template>
    <div class="col-span-12">
        <div class="flex justify-center">
            <Card class="shadow-md w-full">
                <template #title>
                    Absensi
                </template>
                <template #content>
                    <QRCodeVue3
                        :width="500"
                        :height="500"
                        :value="qrCode"
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
                        :download="true"
                        myclass="my-qur flex justify-center"
                        imgclass="img-qr"
                        downloadButton="my-button"
                        :downloadOptions="{ name: 'vqr', extension: 'png' }"
                    />
                </template>
            </Card>
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
            qrCode: ''
        }
    },
    methods: {
        getQrCode() {
            this.qrCode = setInterval(() => {
                ((Math.random() * 100).toFixed(2))+'%';
                console.log(this.changes)
            }, 30000);
        }
    },
    created() {
        this.getQrCode()
    },
}
</script>

<style>

</style>
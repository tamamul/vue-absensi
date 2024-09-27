<template>
    <div class="grid grid-cols-12 m-5" v-if="isLoading">
        <Card class="col-span-12 xl:col-span-6 shadow-md">
            <template #title>
                Absensi
            </template>
            <template #content>
                <Skeleton height="30rem"></Skeleton>
            </template>
        </Card>
    </div>

    <div class="grid grid-cols-12 m-5" v-else>
        <div class="col-span-12 xl:col-span-6">
            <div class="flex justify-center">
                <Card class="shadow-md w-full">
                    <template #title>
                        Absensi
                    </template>
                    <template #content>
                        <QRCodeVue3
                            :key="data"
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
import axios from 'axios';

export default {
    name: 'QRCodeVue3Example',
    inject: ['default'],
    components: {
        QRCodeVue3
    },
    data() {
        return {
            data: '',
            isLoading: true,
            intervalId: null
        }
    },
    methods: {
        async getQrCode() {
            await axios.get('kehadiran/get-kode', {
                headers: {
                    'Authorization': `Bearer ${this.default.token}`
                }
            }).then((res) => {
                this.data = res.data.message.token
                this.isLoading = false
            }).catch((err) => {
                console.log('errorbro' + err)
            })
        },
        async getQrCodeS() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }

            this.intervalId = setInterval(async () => {
                try {
                    const res = await axios.get('kehadiran/get-kode', {
                        headers: {
                            'Authorization': `Bearer ${this.default.token}`
                        }
                    });
                    this.data = res.data.message.token; // Update QR code data
                    console.log("Updated QR Code Data:", this.data); // Log updated data
                } catch (error) {
                    console.error("Error fetching QR code:", error);
                }
            }, 3000);
        }
    },
    mounted() {
        this.getQrCode()
        this.getQrCodeS()
    },
    beforeUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }  
    },
}
</script>

<style>

</style>

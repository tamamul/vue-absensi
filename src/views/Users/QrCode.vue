<template>
	<div class="grid grid-cols-12 gap-5 h-dvh m-5" v-if="isLoading">
        <div class="col-span-12 w-full flex justify-center items-center">
            <ProgressSpinner />
        </div>
	</div>

    <div class="grid grid-cols-12 m-5 mb-24 lg:mb-5 gap-5" v-else>
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
                                type: 'square',
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
                            :cornersSquareOptions="{ type: 'square', color: '#3B82F6' }"
                            :cornersDotOptions="{ type: undefined, color: '#3B82F6' }"
                            fileExt="png"
                            myclass="my-qur flex justify-center"
                            imgclass="img-qr"
                        />
                    </template>
                </Card>
            </div>
        </div>

        <div class="col-span-12 xl:col-span-6">
            <Card class="col-span-12 shadow-md">
                <template #title>
                    History Kehadiran
                </template>
                <template #content>
                    
                </template>
            </Card>
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
            await axios.get('kehadiran/get-kode').then((res) => {
                console.log(res.data.data.token)
                this.data = res.data.data.token
                this.isLoading = false
            }).catch((err) => {
                console.log(err)
            })
        },
        async getQrCodeAfter30seccond() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            this.isLoading = false

            this.intervalId = setInterval(async () => {
                await axios.get('kehadiran/masuk/get-kode').then((res) => {
                    this.data = res.data.data.token;
                    console.log(res.data.data.token)
                }).catch((error) => {
                    console.error(error);
                })
            }, 30000);
        }
    },
    mounted() {
        this.getQrCode()
        this.getQrCodeAfter30seccond()
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

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
                        QR Code Absensi
                    </template>
                    <template #content>
                        <Tabs value="0">
                            <TabList>
                                <Tab value="0">Absen Masuk</Tab>
                                <Tab value="1">Absen Keluar</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel value="0">
                                    <div v-if="infoAbsen" class="text-center w-full mt-32 mb-32 font-bold text-2xl">
                                        Sayang, kamu terlambat
                                    </div>
                                    <QRCodeVue3 
                                        v-else
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
                                </TabPanel>
                                <TabPanel value="1">
                                    <div v-if="infoAbsenKeluar" class="text-center w-full mt-32 mb-32 font-bold text-2xl">Kamu Telah Absen Keluar</div>
                                    <QRCodeVue3 
                                        v-else
                                        :key="dataKeluar"
                                        :width="500"
                                        :height="500"
                                        :value="dataKeluar"
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
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import QRCodeVue3 from "qrcode-vue3";
import axios from 'axios';
import { info } from "autoprefixer";

export default {
    name: 'QRCodeVue3Example',
    inject: ['default'],
    components: {
        QRCodeVue3
    },
    data() {
        return {
            data: '',
            dataKeluar: '',
            isLoading: true,
            infoAbsen: false,
            infoAbsenkeluar: false,
            intervalId: null,
            tabVal: 0,
        }
    },
    methods: {
        async getQrCode() {
            await axios.get('kehadiran/masuk/get-kode').then((res) => {
                // console.log(res.data.data.token)
                this.data = res.data.data.token
                this.isLoading = false
                this.infoAbsen = false
            }).catch((err) => {
                this.isLoading = false
                this.infoAbsen = true
                console.log(err)
                this.$toast.add({
					severity: "error",
					summary: "Error",
					detail: err.response.data.message,
					life: 3000,
				});
            })
        },
        async getQrCodeKeluar() {
            await axios.get('kehadiran/keluar/get-kode').then((res) => {
                // console.log(res.data.data.token)
                this.dataKeluar = res.data.data.token
                this.infoAbsenKeluar = false
                this.isLoading = false
            }).catch((err) => {
                this.isLoading = false
                this.infoAbsenKeluar = true
                console.log(err)
                this.$toast.add({
					severity: "error",
					summary: "Error",
					detail: err.response.data.message,
					life: 3000,
				});
            })
        },
        async getQrCodeAfter30seccond() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            this.isLoading = false

            this.intervalId = setInterval(async () => {
                this.getQrCode()
                this.getQrCodeKeluar()
            }, 30000);
        }
    },
    async mounted() {
        await this.getQrCode()
        await this.getQrCodeKeluar()
        await this.getQrCodeAfter30seccond()
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

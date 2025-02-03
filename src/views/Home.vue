<template>
    <NavBar/>
    <Hero/>
    <About/>
    <More/>
    <Fitur/>
    <Pricelist/>
    <FAQ/>
    <Kontak/>
    <Footer/>
</template>

<script>
import NavBar from '../components/LandingPage/NavBar.vue';
import Hero from '../components/LandingPage/Hero.vue';
import About from '../components/LandingPage/About.vue';
import More from '../components/LandingPage/More.vue';
import Fitur from '../components/LandingPage/Fitur.vue';
import FAQ from '../components/LandingPage/FAQ.vue';
import Kontak from '../components/LandingPage/Kontak.vue';
import Footer from '../components/LandingPage/Footer.vue';
import Pricelist from '@/components/LandingPage/Pricelist.vue';

import router from '@/router'
import { useAuthStore } from '@/stores/auth';

export default {
    name:'Home',
    components: {
        NavBar,
        Hero,
        About,
        More,
        Fitur,
        FAQ,
        Kontak,
        Footer,
        Pricelist,
    },
    inject:['default'],
    data() {
        return {
            authStore: useAuthStore(),
            token: localStorage.getItem('token'),
        }
    },
    methods: {
        async created() {
            if (!this.authStore.authStore) {
                await this.authStore.getUser();
            }
        },
        async goToDashboard() {
            if (this.token) {
                if (this.authStore.userRole === 1) { 
                    router.push({ name: 'admin-dashboard' });
                } else { 
                    router.push({ name: 'user-dashboard' });
                }
            }
        }
    },
    async mounted() {
        await this.created();
        await this.goToDashboard();
    },
}
</script>
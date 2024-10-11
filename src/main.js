import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './style.css'

// * PRIMEVUE
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'

// ? Melakuakn import axios dan menggunakan 
// ? baseURL yang di dapatkan dari config.js
import axios from 'axios'
import config from './config'
import { useAuthStore } from './stores/auth'

const pinia = createPinia();

axios.defaults.baseURL = config.baseURL;  // Set baseURL from config.js
axios.defaults.headers = {
    ...config.headers,  // Use default headers from config.js
};

// Add Axios interceptor to automatically attach Authorization header
axios.interceptors.request.use((axiosConfig) => {
    const authStore = useAuthStore(pinia);  // Access the auth store

    // Attach token if it exists in authStore
    if (authStore.authToken) {
        axiosConfig.headers.Authorization = `Bearer ${authStore.authToken}`;
    }
    return axiosConfig;
}, (error) => {
    return Promise.reject(error);
});

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Lara,
        options: {
            prefix: 'p',
            darkModeSelector: '.dark',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities, custom-class'
            }
        }
    },
    ripple: true,
});

app.use(ConfirmationService)
app.use(ToastService)

app.use(pinia)
app.use(router)

app.mount('#app')

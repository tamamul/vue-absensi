import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        authToken: null
    }),
    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken,
        auth: (state) => !!state.authToken,
    },
    actions: {
        getToken() {
            this.authToken = localStorage.getItem('token');
        },
        async getUser() {
            this.getToken();
            try {
                const res = await axios.get('user', {
                    headers: { 'Authorization': `Bearer ${this.authToken}` }
                });
                console.log(res.data.data);
                this.authUser = res.data.data;
            } catch (err) {
                console.error(err);
                localStorage.removeItem('token');
                router.push({ name: 'login' });
            }
        }
    }
});

import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {

    state: () => ({
        authToken: localStorage.getItem('token') || null,
        authUser: null,
        userRole: null,
    }),

    actions: {
        async login(data) {
            await axios.post('/login', data).then((res) => {
                const token = res.data.data.token;
                localStorage.setItem('token', token);
                this.authToken = token;
                this.getUser();
            }).catch((err) => {
                console.log(err);
            })
        },

        async getUser() {
            await axios.get('/user', {
                headers: { Authorization: `Bearer ${this.authToken}` },
            }).then((res) => {
                this.authUser = res.data;
                this.userRole = res.data.data.is_admin;
            }).catch((err) => {
                console.error('Error fetching user data:', err);
            });
        },

        getToken() {
            return this.authToken || localStorage.getItem('token');
        },

        logout() {
            localStorage.removeItem('token');
            this.authToken = null;
            this.authUser = null;
            this.userRole = null;
        },

    },
});

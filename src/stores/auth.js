import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: localStorage.getItem('token') || null,
        authUser: null,
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await axios.post('/login', credentials);
                const token = response.data.data.token;

                localStorage.setItem('token', token);
                this.authToken = token;

                await this.getUser();
            } catch (error) {
                throw error;
            }
        },

        async getUser() {
            try {
                const response = await axios.get('/user', {
                    headers: { Authorization: `Bearer ${this.authToken}` },
                });
                this.authUser = response.data;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },

        getToken() {
            return this.authToken || localStorage.getItem('token');
        },

        logout() {
            localStorage.removeItem('token');
            this.authToken = null;
            this.authUser = null;
        },
    },
});

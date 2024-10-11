import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: localStorage.getItem('token') || null,  // Initialize from localStorage
        authUser: null,
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await axios.post('/login', credentials);
                const token = response.data.data.token;

                // Save token in localStorage and update store
                localStorage.setItem('token', token);
                this.authToken = token;

                // Fetch the user data after successful login
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
            // Fetch and return the auth token from localStorage
            return this.authToken || localStorage.getItem('token');
        },

        logout() {
            // Clear token and user data on logout
            localStorage.removeItem('token');
            this.authToken = null;
            this.authUser = null;
        },
    },
});

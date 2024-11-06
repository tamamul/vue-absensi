// auth.js
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router'; // Import the router instance

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: localStorage.getItem('token') || null,
        authUser: null,
        userRole: null,
    }),

    actions: {
        async getUser() {
            try {
                const res = await axios.get('/user', {
                    headers: { Authorization: `Bearer ${this.authToken}` },
                });
                this.authUser = res.data;
                this.userRole = res.data.data.is_admin;
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        },

        async login(data) {
            try {
                const res = await axios.post('/login', data);
                const token = res.data.data.token;
                localStorage.setItem('token', token);
                this.authToken = token;

                await this.getUser(); // Fetch user data after setting the token

                // Redirect based on user role
                if (this.userRole === 1) { // Admin
                    router.push({ name: 'admin-dashboard' });
                } else { // Regular user
                    router.push({ name: 'user-dashboard' });
                }
            } catch (err) {
                console.log('Login failed:', err);
            }
        },

        getToken() {
            return this.authToken || localStorage.getItem('token');
        },

        logout() {
            localStorage.removeItem('token');
            this.authToken = null;
            this.authUser = null;
            this.userRole = null;
            router.push({ name: 'login' }); // Redirect to login page on logout
        },
    },
});


import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router'; 

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: localStorage.getItem('token') || null,
        authUser: null,
        userRole: null,
    }),

    actions: {
        async getUser() {
            try {
                const res = await axios.get('/user');
                this.authUser = res.data;
                this.userRole = res.data.data.is_admin;
                // console.log(this.authUser);
                // console.log(this.userRole);
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

                await this.getUser(); 

                if (this.userRole === 1) { 
                    router.push({ name: 'admin-dashboard' });
                } else { 
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
            router.push({ name: 'login' }); 
        },
    },
});

import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            authUser    : null,
            authToken   : null
        }
    },
    getters: {
        user    : (state) => state.authUser,
        token   : (state) => state.authToken,
    },
    actions: {
        // get token
        getToken() {
             this.authToken = localStorage.getItem('token');
        },
        // get user 
        async getUser() {
            this.getToken()
            await axios.get('user', {
                headers: { 'Authorization': `Bearer ${this.authToken}` }
            }).then(res => {
                console.log(res.data.data)
                this.authUser = (res.data.data)
            }).catch(err => {
                console.log(this.authToken)
                console.log(err)
                localStorage.removeItem('token')
                router.push({name: 'login'})
            })
        }
    }
})
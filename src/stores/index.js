import { defineStore } from 'pinia'
import auth from './auth'

export default defineStore({
    namespaced: true,
    modules: {
        auth
    }
})

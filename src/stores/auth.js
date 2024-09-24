import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('auth', {
    state: () => {
        return {
            token   : '',
            user    : '',
        }
    },
    getters: {
        auth(state) {
            return state.token && state.user
        }
    }
})
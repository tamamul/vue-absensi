import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    // State: tempat menyimpan data
    state: () => ({
        count: 0,
        user: null,
    }),

    // Getters: mirip dengan computed property, digunakan untuk menghitung nilai dari state
    getters: {
        doubleCount(state) {
            return state.count * 2
        },
        isLoggedIn(state) {
            return !!state.user
        }
    },

    // Actions: digunakan untuk mengubah state atau melakukan async operations
    actions: {
        increment() {
            this.count++
        },
        login(userData) {
            this.user = userData
        },
        logout() {
            this.user = null
        }
    }
})

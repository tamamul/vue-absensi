import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token   : localStorage.getItem('token'),
            user    : '',
        }
    },
    getters: {
        auth(state) {
            return state.token && state.user
        },
        token(state) {
            return state.token
        },
        user(state) {
            return state.user
        },
    },
    actions: {
        // Login
        login(email, emailErr, emailErrMsg, password, passwordErr, passwordErrMsg) {
            if (email && password) {
                axios.post('/login', {
                    email: email,
                    password: password
                }).then((response) => {
                    console.log(response);
                    localStorage.setItem('token', response.data.data.token)
                    router.push({ name: 'dashboard' })
                }).catch((error) => {
                    // console.log(error);
                    if (error.response.status == 401) {
                        emailErr = false;
                        passwordErr = true;
                       passwordErrMsg = error.response.data.message
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Password anda salah',
                            detail: error.response.data.message,
                            life: 5000
                        });
                    }
                    if (error.response) {
                        const errors = error.response.data.errors
                        if (errors.email && errors.password) {
                            emailErr = true;
                            emailErrMsg = errors.email.join('');
                            passwordErr = true;
                           passwordErrMsg = errors.password.join('');
                        } else if (errors.password) {
                            emailErr = false;
                            passwordErr = true;
                           passwordErrMsg = errors.password.join('');
                        } else if (errors.email) {
                            passwordErr = false;
                            emailErr = true;
                            emailErrMsg = errors.email.join('');
                        }
                    }
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Email atau password anda salah',
                        detail: 'Masukkan email dan password yang benar!',
                        life: 5000
                    });
                });
            } else {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Masukkan Email dan Password',
                    detail: 'Email dan password wajib diisi!',
                    life: 5000
                });
            }
        },
    }
})
import { defineStore } from 'pinia';
// import {
//     login as userLogin,
//     logout as userLogout,
//     getUserProfile,
//     LoginData
// } from '@/api/user/index';
import { setToken, clearToken, isLogin } from '@/utils/auth'
import { UserState } from './types'


export const useUserStore = defineStore('user', {
    state: (): any => ({
        info: {
            bio: null,
            email: null,
            image: null,
            token: null,
            username: null,
        }
    }),
    getters: {
        userInfo(state) {
            return state.info
        },
        isLogin(state) {
            return !!state.info.username
        }
        // userProfile(state: UserState): UserState {
        //     return { ...state };
        // }
    },
    actions: {
        async setLoginData(data: UserState) {
            this.info = data
            const token = data?.token
            if (token) {
                setToken(token);
            }
        },
        async logout() {
            this.$reset();
            clearToken();
        },
    }
})
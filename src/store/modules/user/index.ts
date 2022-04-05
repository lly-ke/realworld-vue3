import { defineStore } from 'pinia';
// import {
//     login as userLogin,
//     logout as userLogout,
//     getUserProfile,
//     LoginData
// } from '@/api/user/index';
import { setToken, clearToken, isLogin } from '@/utils/auth';
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
        // switchRoles() {
        //     return new Promise((resolve) => {
        //         this.role = this.role === 'user' ? 'user' : 'admin';
        //         resolve(this.role);
        //     })
        // },
        // // 设置用户的信息
        // setInfo(partial: Partial<UserState>) {
        //     this.$patch(partial);
        // },
        // // 重置用户信息
        // resetInfo() {
        //     this.$reset();
        // },
        // // 获取用户信息
        // async info() {
        //     const result = await getUserProfile();
        //     this.setInfo(result);
        // },
        // 异步登录并存储token
        async setLoginData(data: UserState) {
            this.info = data
            const token = data?.token
            if (token) {
                setToken(token);
            }
            // return data;
        },
        // Logout
        // async logout() {
        //     await userLogout();
        //     this.resetInfo();
        //     clearToken();
        //     // 路由表重置
        //     // location.reload();
        // }
    }
})
// 权限问题后期增加
import { get, post, del, put } from '@utils/http/axios'
import { ILoginReqData, IRegisterReqData } from './types';
import { UserState } from '@/store/modules/user/types';
// import axios from 'axios';
enum URL {
    logout = '/user/logout',
    profile = '/user/profile',
    login = '/users/login',
    register = '/users',
    userInfo = '/user'
}

const getUserInfo = async () => get({ url: URL.userInfo })
const updateUserInfo = async (data: any) => put({ url: URL.userInfo, data })
const getUserProfile = async () => get<UserState>({ url: URL.profile });
const login = async (data: ILoginReqData) => post({ url: URL.login, data });
const register = async (data: IRegisterReqData) => post({ url: URL.register, data })
const follow = async (username: string) => post({ url: `/profiles/${username}/follow` })
const unFollow = async (username: string) => del({ url: `/profiles/${username}/follow` })
// const logout = async () => post<LoginRes>({ url: URL.logout });
export { getUserProfile, updateUserInfo, login, register, getUserInfo, follow, unFollow };
// 权限问题后期增加
import { get, post } from '@utils/http/axios'
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
const getUserProfile = async () => get<UserState>({ url: URL.profile });
const login = async (data: ILoginReqData) => post({ url: URL.login, data });
const register = async (data: IRegisterReqData) => post({ url: URL.register, data })
// const logout = async () => post<LoginRes>({ url: URL.logout });
export { getUserProfile, login, register, getUserInfo };
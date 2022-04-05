export interface ReqParams {
    username: string;
    password: string;
}

export interface ReqAuth {
    auths: string[];
    modules: string[];
    is_admin?: 0 | 1;
}

// export interface ResResult {
//     data?: ResResultData;
//     status: string | '';
//     headers: object
// }
export interface ResResult {

}
export interface ResResultData {
    code?: number;
    result?: any;
    message: string;
    status: string
}




/**用户登录 */
export interface ILoginReqData {
    user: IUser
}


/**
 * 注册接口
 */
export interface IRegisterReqData {
    user: IUser
}

export interface IUser {
    username?: string | null
    email: string | null
    password: string | null
}
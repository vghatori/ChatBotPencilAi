//viet login logout, register ở đây
import { UserInfo, UserToken } from '../../../types/entity';
import apiClient from '../apiClient';

export interface SignInReq {
    email : string,
    password : string,
};

export type SignInRes = UserToken & { user: UserInfo };

export enum UserApi {
    SignIn = '', // gán đường dẫn đây
};

const signin = async (data : SignInReq) => {
    const response: any = await apiClient.post<SignInRes>({ url : UserApi.SignIn, data});
    if (response.status === 200) {
        return response.data;
    }
    return null;
};


export default {
    signin,
};

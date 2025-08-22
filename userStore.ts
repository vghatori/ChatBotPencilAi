import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import userService, { ForgotReq, ResetPassReq, SignInReq } from '@/api/services/userService';
import adminService from '@/api/services/adminService';
import { getRoutesByRole } from '@/utils/common';
import { getItem, removeItem, setItem } from '@/utils/storage';

import { UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () => useUserStore((state) => state.userInfo.permissions);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useResetPassword = () => {
  const resetPasswordMutation = useMutation({
    mutationFn: userService.resetpass,
  });
  const resetpassword = async (data: ResetPassReq) => {
    try {
      const response: any = await resetPasswordMutation.mutateAsync(data);
      return response;
    } catch (err) {
      message.warning({
        content: err.message,
        duration: 3,
      });
    }
  }
  return resetpassword;
}

export const useForgot = () => {
  const forGetMutation = useMutation({
    mutationFn: userService.forgot,
  });

  const forGot = async (data: ForgotReq) => {
    try {
      const response: any = await forGetMutation.mutateAsync(data);
      return response;
    } catch (err) {
      message.warning({
        content: err.message,
        duration: 3,
      });
    }
  }
  return forGot;
}

export const useSignIn = () => {
  const navigatge = useNavigate();
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation({
    mutationFn: userService.signin,
  });

  const signIn = async (data: SignInReq) => {
    try {
      const response: any = await signInMutation.mutateAsync(data);
      const { email, id, name, token, role_name } = response;

      const user: any = {
        email,
        id,
        isVerified: response.is_verified,
        name,
        permissions: getRoutesByRole(role_name),
      };
      setUserToken({ accessToken: token });
      setUserInfo(user);
      navigatge(HOMEPAGE, { replace: true });
    } catch (err) {
      message.warning({
        content: err.message,
        duration: 3,
      });
    }
  };

  return signIn;
};

export const useLogout = () => {
  const logOut = () => {
    removeItem(StorageEnum.Token);
    removeItem(StorageEnum.User);
  }
  return logOut;
}

export default useUserStore;

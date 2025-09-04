"use client";

import userService, { SignInReq } from "@/core/api/services/userService";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
    const router = useRouter();
    // const { setUserToken, setUserInfo } = useUserActions();
  
    const signInMutation = useMutation({
      mutationFn: userService.signin,
    });
  
        const signIn = async (data: SignInReq) => {
      try {
        const response: unknown = await signInMutation.mutateAsync(data);
        if (response && typeof response === 'object' && 'email' in response && 'id' in response && 'name' in response) {
          const { email, id, name } = response as { email: string; id: string; name: string };

          // const user = {
          //   email,
          //   id,
          //   name,
          // };
          // setUserToken({ accessToken: token });
          // setUserInfo(user);
          router.push('/dashboard');
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        message.warning({
          content: errorMessage,
          duration: 3,
        });
      }
    };
    return signIn;
};
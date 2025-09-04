"use client";

import userService, { SignInReq } from "@/core/api/services/userService";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
<<<<<<< HEAD
import { useRouter } from "next/router";
=======
import { useRouter } from "next/navigation";
>>>>>>> 9b979c2b9032a28c0c67450d793b29a01e0542c8

export const useSignIn = () => {
    const router = useRouter();
    // const { setUserToken, setUserInfo } = useUserActions();
  
    const signInMutation = useMutation({
      mutationFn: userService.signin,
    });
  
        const signIn = async (data: SignInReq) => {
      try {
<<<<<<< HEAD
        const response: any = await signInMutation.mutateAsync(data);
        const { email, id, name} = response; // cần thêm token, role_name để phân quyền
  
        const user: any = {
          email,
          id,
          name,
        };
        // setUserToken({ accessToken: token });
        // setUserInfo(user);
        router.push('/homepage');
      } catch (err : any) {
=======
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
>>>>>>> 9b979c2b9032a28c0c67450d793b29a01e0542c8
        message.warning({
          content: errorMessage,
          duration: 3,
        });
      }
    };
    return signIn;
};
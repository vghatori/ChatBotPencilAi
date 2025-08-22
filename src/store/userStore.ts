import userService, { SignInReq } from "@/api/services/userService";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const useSignIn = () => {
    const navigatge = useNavigate();
    // const { setUserToken, setUserInfo } = useUserActions();
  
    const signInMutation = useMutation({
      mutationFn: userService.signin,
    });
  
    const signIn = async (data: SignInReq) => {
      try {
        const response: any = await signInMutation.mutateAsync(data);
        const { email, id, name} = response; // cần thêm token, role_name để phân quyền
  
        const user: any = {
          email,
          id,
          name,
        };
        // setUserToken({ accessToken: token });
        // setUserInfo(user);
        navigatge('/homepage', { replace: true });
      } catch (err : any) {
        message.warning({
          content: err.message,
          duration: 3,
        });
      }
    };
    return signIn;
};
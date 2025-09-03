import React from 'react'
import { useSignIn } from '@/core/store/userStore'
import { SignInReq } from '@/core/api/services/userService'
import Form from 'antd'


export default function Login() {
  const signin = useSignIn()
  const handleLogin = (values : SignInReq) => { // ví dụ gửi request
    const {email, password} = values;
    const data = signin({email, password})
  }

  return (
    <div>
        code ở đây
    </div>
  )
}
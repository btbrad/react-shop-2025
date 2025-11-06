import { useRef, useState } from 'react'
import useRequest from '../../utils/useRequest'
import Modal, { ModalType } from '../../components/Modal'
import type { RegisterParams, RegisterResponseType } from './types'

const Login = () => {
  const [registerForm, setRegisterForm] = useState<RegisterParams>({
    username: '',
    password: '',
    phone: '',
    confirmPassword: '',
  })

  const modalRef = useRef<ModalType>(null)

  const { request } = useRequest<RegisterResponseType>(
    'http://localhost:3001/register',
    'POST',
    {
      ...registerForm,
    }
  )

  const handleLogin = () => {
    console.log(registerForm)
    if (registerForm.username === '') {
      modalRef.current?.showMessage('用户名不能为空')
      return
    }
    if (registerForm.phone === '') {
      modalRef.current?.showMessage('手机号不能为空')
      return
    }
    if (registerForm.password === '') {
      modalRef.current?.showMessage('密码不能为空')
      return
    }
    if (registerForm.confirmPassword === '') {
      modalRef.current?.showMessage('用户名不能为空')
      return
    }
    if (registerForm.confirmPassword !== registerForm.password) {
      modalRef.current?.showMessage('两次输入的密码不一致')
      return
    }
    request()
      .then((res) => {
        console.log('注册成功', res)
        modalRef.current?.showMessage(res!.message)
      })
      .catch((err) => {
        console.log('注册失败', err)
        modalRef.current?.showMessage(err!.message)
      })
  }

  return (
    <>
      <div className="login-form">
        <div className="row">
          <div className="label">用户名</div>
          <div className="value">
            <input
              value={registerForm.username}
              onChange={(e) => {
                setRegisterForm({ ...registerForm, username: e.target.value })
              }}
              placeholder="请输入用户名"
            />
          </div>
        </div>

        <div className="row">
          <div className="label">手机号</div>
          <div className="value">
            <input
              value={registerForm.phone}
              onChange={(e) => {
                setRegisterForm({ ...registerForm, phone: e.target.value })
              }}
              placeholder="请输入手机号"
            />
          </div>
        </div>

        <div className="row">
          <div className="label">密码</div>
          <div className="value">
            <input
              value={registerForm.password}
              onChange={(e) => {
                setRegisterForm({ ...registerForm, password: e.target.value })
              }}
              type="password"
              placeholder="请输入密码"
            />
          </div>
        </div>

        <div className="row">
          <div className="label">确认密码</div>
          <div className="value">
            <input
              value={registerForm.confirmPassword}
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  confirmPassword: e.target.value,
                })
              }}
              type="password"
              placeholder="请输入确认密码"
            />
          </div>
        </div>

        <div className="btn" onClick={handleLogin}>
          注册
        </div>
      </div>
      <Modal ref={modalRef} />
    </>
  )
}

export default Login

import { useRef, useState } from 'react'
import useRequest from '../../utils/useRequest'
import Modal, { ModalType } from '../../components/Modal'
import { useNavigate } from 'react-router-dom'

interface LoginParams {
  username: string
  password: string
}

interface ResponseType {
  user: {
    token: string
  }
  message: string
}

const Login = () => {
  const [loginForm, setLoginForm] = useState<LoginParams>({
    username: '',
    password: '',
  })

  const modalRef = useRef<ModalType>(null)

  const navigate = useNavigate()

  const { request } = useRequest<ResponseType>(
    'http://localhost:3001/login',
    'POST',
    {
      ...loginForm,
    }
  )

  const handleLogin = () => {
    console.log(loginForm)
    if (loginForm.username === '' || loginForm.password === '') {
      modalRef.current?.showMessage('用户名或密码不能为空')
      return
    }
    request()
      .then((res) => {
        console.log('登录成功', res)
        modalRef.current?.showMessage(res!.message)
        window.localStorage.setItem('token', res!.user.token)
        navigate('/home')
      })
      .catch((err) => {
        console.log('登录失败', err)
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
              value={loginForm.username}
              onChange={(e) => {
                setLoginForm({ ...loginForm, username: e.target.value })
              }}
              placeholder="请输入用户名"
            />
          </div>
        </div>

        <div className="row">
          <div className="label">密码</div>
          <div className="value">
            <input
              value={loginForm.password}
              onChange={(e) => {
                setLoginForm({ ...loginForm, password: e.target.value })
              }}
              type="password"
              placeholder="请输入密码"
            />
          </div>
        </div>

        <div className="btn" onClick={handleLogin}>
          登录
        </div>
      </div>
      <Modal ref={modalRef} />
    </>
  )
}

export default Login

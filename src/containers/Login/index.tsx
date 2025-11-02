import { useRef, useState } from 'react'
import './style.css'
import useRequest from '../../utils/useRequest'
import Modal, { ModalType } from '../../components/Modal'

type TabValue = 'login' | 'register'

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
  const [tab, setTab] = useState<TabValue>('login')
  const [loginForm, setLoginForm] = useState<LoginParams>({
    username: '',
    password: '',
  })

  const modalRef = useRef<ModalType>(null)

  const handleSwitchTab = (tab: TabValue) => {
    setTab(tab)
  }

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
      })
      .catch((err) => {
        console.log('登录失败', err)
        modalRef.current?.showMessage(err!.message)
      })
  }

  return (
    <div className="page login-page">
      <div className="tab">
        <div
          className={`tab-item ${tab === 'login' ? 'tab-item active' : null}`}
          onClick={() => handleSwitchTab('login')}
        >
          登录
        </div>
        <div
          className={`tab-item ${
            tab === 'register' ? 'tab-item active' : null
          }`}
          onClick={() => handleSwitchTab('register')}
        >
          注册
        </div>
      </div>
      {tab === 'login' ? (
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
      ) : (
        <div>注册</div>
      )}
      <Modal ref={modalRef} />
    </div>
  )
}

export default Login

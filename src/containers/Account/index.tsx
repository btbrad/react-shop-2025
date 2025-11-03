import { Link, Outlet, useLocation } from 'react-router-dom'
import './style.css'
import { useMemo } from 'react'

const Account = () => {
  const location = useLocation()

  const checkActive = useMemo(
    () => (path: string) => location.pathname.startsWith(path),
    [location.pathname]
  )

  return (
    <div className="page login-page">
      <div className="tab">
        <div
          className={`tab-item ${
            checkActive('/account/login') ? 'active' : ''
          }`}
        >
          <Link to="/account/login">登录</Link>
        </div>
        <div
          className={`tab-item ${
            checkActive('/account/register') ? 'active' : ''
          }`}
        >
          <Link to="/account/register">注册</Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Account

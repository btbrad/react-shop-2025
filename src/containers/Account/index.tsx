import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import './style.css'
import { useEffect, useMemo } from 'react'

const Account = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const checkActive = useMemo(
    () => (path: string) => location.pathname.startsWith(path),
    [location.pathname]
  )

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      navigate('/home')
    }
  }, [navigate])

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

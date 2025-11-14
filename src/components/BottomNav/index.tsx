import './index.scss'
import { Link, useLocation } from 'react-router-dom'

const BottomNav = () => {
  const location = useLocation()

  const checkActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="bottom-nav">
      <div
        className={`bottom-nav-item ${checkActive('/home') ? 'active' : ''}`}
      >
        <Link to="/home">首页</Link>
      </div>
      <div className="bottom-nav-item">
        <Link to="/category">分类</Link>
      </div>
      <div className="bottom-nav-item">
        <Link to="/cart">购物车</Link>
      </div>
      <div className="bottom-nav-item">
        <Link to="/mine">我的</Link>
      </div>
    </div>
  )
}

export default BottomNav

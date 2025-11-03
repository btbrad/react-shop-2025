import { useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import logo from '../../assets/react.svg'

function App() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (el) {
      el.style.opacity = '1'
    }
  }, [])

  const navigate = useNavigate()
  const handleToLogin = useCallback(() => {
    navigate('/account/login')
  }, [navigate])

  return (
    <div ref={ref} className="page guide-page">
      <img className="main-pic" src={logo} alt="logo" />
      <div className="title">欢乐购</div>
      <div className="slogan1">买的开心</div>
      <div className="slogan2">吃的放心</div>
      <div className="arrow-right iconfont" onClick={handleToLogin}>
        &#xe624;
      </div>
    </div>
  )
}

export default App

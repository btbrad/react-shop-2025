import './styles/App.css'

import logo from './assets/react.svg'
import { useRef, useEffect } from 'react'

function App() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (el) {
      el.style.opacity = '1'
    }
  }, [])

  return (
    <div ref={ref} className="page guide-page">
      <img className="main-pic" src={logo} alt="logo" />
      <div className="title">欢乐购</div>
      <div className="slogan1">买的开心</div>
      <div className="slogan2">吃的放心</div>
      <div className="arrow-right iconfont">&#xe624;</div>
    </div>
  )
}

export default App

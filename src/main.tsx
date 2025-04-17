import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'normalize.css'
import './styles/base.css'
import 'lib-flexible/flexible'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

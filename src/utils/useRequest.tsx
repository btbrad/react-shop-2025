import axios, { Method } from 'axios'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
const useRequest = <T,>(url: string, method: Method, payload: unknown) => {
  const navigate = useNavigate()
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  const controllerRef = useRef(new AbortController())

  const cancel = () => {
    controllerRef.current.abort()
  }

  const request = () => {
    // 清空之前的请求状态和数据
    setData(null)
    setError('')
    setLoaded(false)

    const loginToken = window.localStorage.getItem('token') || ''
    const headers = loginToken ? { token: loginToken } : {}

    return axios
      .request<T>({
        url,
        method,
        signal: controllerRef.current.signal,
        data: payload,
        headers,
      })
      .then((res) => {
        setData(res.data)
        if (res.data) {
          return res.data
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          window.localStorage.removeItem('token')
          navigate('/account/login')
        }
        setError((e as Error).message || '请求失败')
        throw new Error(e)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  return { data, error, loaded, request, cancel }
}

export default useRequest

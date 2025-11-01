import axios, { Method } from 'axios'
import { useState, useRef } from 'react'
const useRequest = <T,>(url: string, method: Method, payload: unknown) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  const controllerRef = useRef(new AbortController())

  const cancel = () => {
    controllerRef.current.abort()
  }

  const request = async () => {
    // 清空之前的请求状态和数据
    setData(null)
    setError('')
    setLoaded(false)

    try {
      const response = await axios.request<T>({
        url,
        method,
        signal: controllerRef.current.signal,
        data: payload,
      })
      setData(response.data)
    } catch (e: unknown) {
      setError((e as Error).message || '请求失败')
    } finally {
      setLoaded(true)
    }
  }

  return { data, error, loaded, request, cancel }
}

export default useRequest

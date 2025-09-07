import axios, { Method } from 'axios'
import { useState } from 'react'
const useRequest = (url: string, method: Method, payload: unknown) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  const request = async () => {
    // 清空之前的请求状态和数据
    setData(null)
    setError('')
    setLoaded(false)

    try {
      const response = await axios.request({ url, method, data: payload })
      setData(response.data)
    } catch (e: unknown) {
      setError((e as Error).message || '请求失败')
    } finally {
      setLoaded(true)
    }
  }

  return { data, error, loaded, request }
}

export default useRequest

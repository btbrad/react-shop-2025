import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.css'
import './index.scss'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [position, setPosition] = useState<{
    longitude: number
    latitude: number
  } | null>(null)

  const [address, setAddress] = useState('')

  useEffect(() => {
    const localPosition = window.localStorage.getItem('position')
    if (localPosition) {
      console.log('本地缓存位置：', JSON.parse(localPosition))
      setPosition(JSON.parse(localPosition))
      return
    }

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          const { longitude, latitude } = position.coords
          console.log(`纬度：${latitude} 经度：${longitude}`)
          window.localStorage.setItem(
            'position',
            JSON.stringify({ longitude, latitude })
          )
          setPosition({ longitude, latitude })
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }, [])

  const request = useCallback(() => {
    if (!position) return
    return axios.request({
      url: 'http://localhost:3001/home',
      method: 'GET',
      params: {
        ...position,
      },
    })
  }, [position])

  useEffect(() => {
    request()?.then((res) => {
      console.log(111, res)
      setAddress(res.data.data.address)
    })
  }, [request])

  return (
    <div>
      <h1>Home</h1>
      <p>地址：{address}</p>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="banner-item">Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-item">Slide 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-item">Slide 3</div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Home

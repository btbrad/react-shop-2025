import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.css'
import './index.scss'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import type { BannerType } from './types'

const Home = () => {
  const [position, setPosition] = useState<{
    longitude: number
    latitude: number
  } | null>(null)

  const [address, setAddress] = useState('')
  const [banners, setBanners] = useState<BannerType[]>([])

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
      setAddress(res.data.data.address)
      setBanners(res.data.data.banners)
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
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="banner-item">Slide {item.id}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Home

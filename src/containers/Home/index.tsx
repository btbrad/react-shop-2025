import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.css'
import './index.scss'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import type { BannerType, CategoryType, NewGoodType } from './types'

const Home = () => {
  const [position, setPosition] = useState<{
    longitude: number
    latitude: number
  } | null>(null)

  const [address, setAddress] = useState('')
  const [banners, setBanners] = useState<BannerType[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [newGoods, setNewGoods] = useState<NewGoodType[]>([])

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
      setCategories(res.data.data.categories)
      setNewGoods(res.data.data.newGoods)
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
      <div className="categories">
        {categories.map((category) => (
          <div className="category-item" key={category.id}>
            <div className="category-title">{category.title}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '20PX',
        }}
      >
        <p>新品尝鲜</p>
        <p>查看更多&gt;</p>
      </div>
      <div className="new-goods">
        {newGoods.map((good) => (
          <div className="new-good-item" key={good.id}>
            <div className="new-good-title">{good.title}</div>
          </div>
        ))}
      </div>
      <div className="bottom-nav">
        <div className="bottom-nav-item">首页</div>
        <div className="bottom-nav-item">分类</div>
        <div className="bottom-nav-item">购物车</div>
        <div className="bottom-nav-item">我的</div>
      </div>
    </div>
  )
}

export default Home

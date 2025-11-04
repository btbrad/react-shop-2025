import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.css'
import './index.scss'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    const localPosition = window.localStorage.getItem('position')
    if (localPosition) {
      console.log('本地缓存位置：', JSON.parse(localPosition))
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
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }, [])

  return (
    <div>
      <h1>Home</h1>
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

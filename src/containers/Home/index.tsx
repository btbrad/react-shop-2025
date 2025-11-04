import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.css'
import './index.scss'

const Home = () => {
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

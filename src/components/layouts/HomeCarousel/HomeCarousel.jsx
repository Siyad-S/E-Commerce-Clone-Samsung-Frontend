import React from 'react'
import "./HomeCarousel.css"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import WashingMachine from "../../images/EcoBubble_washing machine.webp"
import Tv from "../../images/Neo-QLED_1440X640.webp"
import Holiday from "../../images/Samsung_HOLIDAY_MainKV_PC-1.webp"
import Flip5 from "../../images/z flip 5.webm"
import Header from '../../common/Header/Header'

const HomeCarousel = () => {


    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };

  return (
    <>
    <Header />
    <div className='home_carousel'>
        <Slider {...settings}>
            <div className='carousel_img'>
                <img src={WashingMachine} alt="" />
            </div>
            <div className='carousel_img'>
                <img src={Tv} alt="" />
            </div>
            <div className='carousel_img'>
                <img src={Holiday} alt="" />
            </div>
            <div className='carousel_img'>
                <video controls autoPlay src={Flip5} alt="" />
            </div>
        </Slider>
      </div>
      </>
  )
}

export default HomeCarousel
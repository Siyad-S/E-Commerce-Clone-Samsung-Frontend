import React, { useEffect } from "react";
import "./HomeCarousel.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../../common/Header/Header";
import { getBanners } from "../../../Redux/Slices/AdminSlice";
import { useDispatch, useSelector } from "react-redux";

const HomeCarousel = () => {
  const allBanners =
    useSelector((state) => state.adminSlice.banners.bannerData) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="home_carousel">
        <Slider {...settings}>
          {allBanners.map((banner, index) => (
            <div className="banner" key={index}>
              <div className="carousel_img">
                <img
                  src={`http://localhost:5001/banner/uploads/${banner.image}`}
                  alt=""
                />
              </div>
              <div className="banner_content">
                <h1>{banner.title}</h1>
                <p>{banner.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default HomeCarousel;

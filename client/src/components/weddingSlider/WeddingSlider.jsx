import React from "react";
import "./WeddingSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { weddingSlider } from "../../data/weddingSlider";
import { NavLink } from "react-router-dom";

function WeddingSlider() {
  const settings = {
    dots: true,
    fade: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="weddingSliderContainer">
      <div className="weddingInfo">
        <h2>hand-crafted in the blue mountains</h2>
        <h1>wedding flowers & bouquets</h1>
        <button onClick={scrollToTop}><NavLink to="wedding-process">wedding quotes</NavLink></button>
      </div>
      <div className="sliderContainer">
        <Slider {...settings}>
          {weddingSlider.map((item, index) => (
            <div key={index}>
              <div className="weddingImages">
                <img src={item.image} alt="wedding image" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default WeddingSlider;

import React from "react";
import "./WeddingSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { weddingSlider } from "../../data/weddingSlider";

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

  return (
    <div className="weddingSliderContainer">
      <div className="weddingInfo">
        <h2>hand-crafted in the blue mountains</h2>
        <h1>wedding flowers & bouquets</h1>
        <button>wedding quotes</button>
      </div>
      <div className="sliderContainer">
        <Slider {...settings}>
          {weddingSlider.map((item, index) => (
            <>
              <div className="weddingImages" key={index}>
                <img src={item.image} alt="wedding image" />
              </div>
            </>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default WeddingSlider;

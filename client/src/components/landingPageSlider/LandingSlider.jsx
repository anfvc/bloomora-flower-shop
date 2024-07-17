import React from "react";
import "./LandingSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { landingSlider } from "../../data/landingPageSlider.js";
import { useNavigate } from "react-router-dom";

function LandingSlider() {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: false
  };

  return (
    <div className="sliderContainer">
      <Slider {...settings}>
        {landingSlider.map((item, index) => (
          <div key={index} className="slide">
            <div className="image">
              <img src={item.image} alt="" />
            </div>
            <div className="infos-buttons">
              <h2>{item.title1}</h2>
              <h1>{item.title2}</h1>
              <div className="buttons">
                <button onClick={() => navigate("/shop")}>Shop</button>
                <button onClick={() => navigate("/contact")}>Contact</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default LandingSlider;

import React from "react";
import "./LandingSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { landingSlider } from "../../data/landingPageSlider.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LandingSlider() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
              <h2>{t(item.title1)}</h2>
              <h1>{t(item.title2)}</h1>
              <div className="buttons">
                <button onClick={() => navigate("/shop")}>{t("shop.header1")}</button>
                <button onClick={() => navigate("/contact")}>{t("contact.header")}</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default LandingSlider;

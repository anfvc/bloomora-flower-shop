import React from "react";
import "./MostPopularProducts.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MostPopularProducts() {
  const { t } = useTranslation();

  return (
    <div className="mostPopularContainer">
      <div className="popularHeader">
        <h1>{t("mostPopular.header")}</h1>
      </div>
      <div className="popularProductBox">
        <div className="box">
          <div className="productImage">
            <img
              src="https://res.cloudinary.com/dytfuzksa/image/upload/v1720604711/fpva8vehghevmnsman66.jpg"
              alt="product"
            />
          </div>
          <div className="productInfo">
            <h2>pink morning</h2>
          </div>
        </div>
        <div className="box">
          <div className="productImage">
            <img
              src="https://res.cloudinary.com/dytfuzksa/image/upload/v1720604731/mrafbpsdaaolmwygpi3v.jpg"
              alt="product"
            />
          </div>
          <div className="productInfo">
            <h2>Angel</h2>
          </div>
        </div>
        <div className="box">
          <div className="productImage">
            <img
              src="https://res.cloudinary.com/dytfuzksa/image/upload/v1720604771/fvl9abh8gwfugkc5urz2.jpg"
              alt="product"
            />
          </div>
          <div className="productInfo">
            <h2>sinderella</h2>
          </div>
        </div>
        <div className="box">
          <div className="productImage">
            <img
              src="https://res.cloudinary.com/dytfuzksa/image/upload/v1720604792/bp9mt3ai23sx20yf4hnf.jpg"
              alt="product"
            />
          </div>
          <div className="productInfo">
            <h2>Biatris Figurine</h2>
          </div>
        </div>
        <div className="box">
          <div className="productImage">
            <img
              src="https://res.cloudinary.com/dytfuzksa/image/upload/v1720604902/hdtc2al9pxdpowezmpzv.jpg"
              alt="product"
            />
          </div>
          <div className="productInfo">
            <h2>Anthurium</h2>
          </div>
        </div>
        <div className="box">
          <div className="productImage">
            <img
              src="https://res.cloudinary.com/dytfuzksa/image/upload/v1720604162/sdwdllrlujezmnmsm89n.jpg"
              alt="product"
            />
          </div>
          <div className="productInfo">
            <h2>Rich Bubbles</h2>
          </div>
        </div>
        <div className="popularSeeMore">
          <NavLink to="/shop"><button> {t("mostPopular.seeAll")} </button></NavLink>
        </div>
      </div>
    </div>
  );
}

export default MostPopularProducts;

import React, { useEffect } from "react";
import "./OurRoots.css";
import image4 from "../../images/ourRootsImage/image4.jpg";
import image5 from "../../images/ourRootsImage/image5.jpg";
import { useTranslation } from "react-i18next";

function OurRoots() {
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const image1Element = document.querySelector(".image1");
      const image2Element = document.querySelector(".image2");
      const scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        image1Element.classList.add("visible1");
        image2Element.classList.add("visible2");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="ourRootsContainer">
      <div className="backgroundImage"></div>
      <div className="header">
        <h1>{t("ourRoots.header")}</h1>
      </div>
      <div className="roots">
        <div className="index">
          <p>{t("ourRoots.description")}</p>
          <p>
            {t("ourRoots.bio")}{" "}
            <a href="http://seattlewholesalegrowersmarket.com/">
              http://seattlewholesalegrowersmarket.com/
            </a>
            {t("ourRoots.publications")}
          </p>
          <p>
            {t("ourRoots.learnMore")}{" "}
            <a href="https://slowflowers.com/">https://slowflowers.com/</a>
          </p>
        </div>
        <div className="rootImages">
          <img src={image4} alt="" className="image1" />
          <img src={image5} alt="" className="image2" />
        </div>
      </div>
    </div>
  );
}

export default OurRoots;

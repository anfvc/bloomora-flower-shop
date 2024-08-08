import React from "react";
import "./WeddingProcess.css";
import image2 from "../../images/wedding/weddingProcess/image2.jpg";
import image3 from "../../images/wedding/weddingProcess/image3.jpg";
import image4 from "../../images/wedding/weddingProcess/image4.jpg";
import image5 from "../../images/wedding/weddingProcess/image5.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function WeddingProcess() {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <div className="weddingProcessContainer">
      <div className="backgroundImage"></div>
      <div className="header">
        <h1>{t("weddingProcess.header")}</h1>
      </div>

      <div className="we-boxContainer">
        <div className="we-box">
          <img src={image2} alt="image2" className="image-we" />
          <div className="step">
            <h1>
              {t("weddingProcess.step")} <span>1</span>
            </h1>
            <p>{t("weddingProcess.step1Description")}</p>
            <div className="bttns">
              <NavLink className="inquiryBtn" to="/wedding-inquiry"><button>{t("weddingProcess.weddingInquiry")}</button></NavLink>
              <button>{t("weddingProcess.aLaCarteInquiry")}</button>
            </div>
          </div>
        </div>

        <div className="we-box">
          <div className="step">
            <h1>
              {t("weddingProcess.step")} <span>2</span>
            </h1>
            <p>{t("weddingProcess.step2Description")}</p>
            <div className="bttns">
              <button className="weddingGalleryBtn"><NavLink to="/wedding-gallery">{t("weddingProcess.weddingGallery")}</NavLink></button>
            </div>
          </div>
          <img src={image3} alt="image3" />
        </div>

        <div className="we-box">
          <img src={image4} alt="image4" />
          <div className="step">
            <h1>
              {t("weddingProcess.step")} <span>3</span>
            </h1>
            <p>{t("weddingProcess.step3Description")}</p>
          </div>
        </div>

        <div className="we-box">
          <div className="step">
            <h1>
              {t("weddingProcess.step")} <span>4</span>
            </h1>
            <p>{t("weddingProcess.step4Description")}</p>
          </div>
          <img src={image5} alt="image5" />
        </div>
      </div>
    </div>
  );
}

export default WeddingProcess;

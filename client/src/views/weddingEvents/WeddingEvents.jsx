import React from "react";
import "./WeddingEvents.css";
import image1 from "../../images/wedding/weddingEvents/image2.jpg";
import image2 from "../../images/wedding/weddingEvents/image3.jpg";
import image3 from "../../images/wedding/weddingEvents/image4.jpg";
import past1 from "../../images/wedding/weddingEvents/past1.jpg";
import past2 from "../../images/wedding/weddingEvents/past2.jpg";
import past3 from "../../images/wedding/weddingEvents/past3.jpg";
import past4 from "../../images/wedding/weddingEvents/past4.jpg";
import past5 from "../../images/wedding/weddingEvents/past5.jpg";
import past6 from "../../images/wedding/weddingEvents/past6.jpg";
import past7 from "../../images/wedding/weddingEvents/past7.jpg";
import past8 from "../../images/wedding/weddingEvents/past8.jpg";
import past9 from "../../images/wedding/weddingEvents/past9.jpg";
import { useTranslation } from "react-i18next";

function WeddingEvents() {
  const { t } = useTranslation();

  return (
    <div className="weddingEventsContainer">
      <div className="backGroundImage"></div>
      <div className="header">
        <h1>{t("weddingEvents.header")}</h1>
      </div>

      <div className="eventBoxContainer">
        <div className="box1">
          <div className="infoBox">
            <h2>{t("weddingEvents.flowersForYouTitle")}</h2>
            <p>
              {t("weddingEvents.flowersForYouDescription1")}{" "}
              <span>{t("weddingEvents.experience")}</span>{" "}
              {t("weddingEvents.flowersForYouDescription2")}
            </p>
          </div>
          <div className="imageBox1">
            <img src={image1} alt="" />
          </div>
        </div>

        <div className="box2">
          <div className="imageBox2">
            <img src={image2} alt="" />
          </div>
          <div className="infoBox2">
            <h2>{t("weddingEvents.whatWeOfferTitle")}</h2>
            <div className="offers">
              <ul>
                <li>{t("weddingEvents.cocktailArrangements")}</li>
                <li>{t("weddingEvents.centerpieces")}</li>
                <li>{t("weddingEvents.statementPieces")}</li>
                <li>{t("weddingEvents.floralInstallations")}</li>
                <li>{t("weddingEvents.plantInstallations")}</li>
              </ul>
              <ul>
                <li>{t("weddingEvents.corporateEvents")}</li>
                <li>{t("weddingEvents.dinnerParties")}</li>
                <li>{t("weddingEvents.showers")}</li>
                <li>{t("weddingEvents.rehearsals")}</li>
                <li>{t("weddingEvents.staging")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="box3">
          <div className="infoBox3">
            <h2>{t("weddingEvents.flowersForYouTitle")}</h2>
            <p>
              {t("weddingEvents.flowersForYouDescription1")}{" "}
              <span>{t("weddingEvents.experience")}</span>{" "}
              {t("weddingEvents.flowersForYouDescription2")}
            </p>
            <div className="orderButtonBox">
              <button>{t("weddingEvents.inquireAboutEvent")}</button>
            </div>
          </div>
          <div className="imageBox3">
            <img src={image3} alt="" />
          </div>
        </div>

        <div className="pastEventsContainer">
          <div className="past-header">
            <h2>{t("weddingEvents.pastEventsTitle")}</h2>
          </div>

          <div className="pastEventBoxContainer">
            <div className="pastEventBox1">
              <img src={past1} alt="" />
              <img src={past2} alt="" />
              <img src={past3} alt="" />
            </div>

            <div className="pastEventBox2">
              <img src={past4} alt="" />
              <img src={past5} alt="" />
              <img src={past6} alt="" />
            </div>

            <div className="pastEventBox3">
              <img src={past7} alt="" />
              <img src={past8} alt="" />
              <img src={past9} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeddingEvents;

import React, { useEffect } from "react";
import "./OurRoots.css";
import P1 from "../../images/ourRootsImage/P1V2.png";
import P2 from "../../images/ourRootsImage/P2V2.png";
import P3 from "../../images/ourRootsImage/P3V2.png";
import Logo from "../../images/logo/bloomoraV6.png";
import { useTranslation } from "react-i18next";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function OurRoots() {
  const { t } = useTranslation();

  const handleNavLinkClick = (e) => {
    e.preventDefault();
    window.open(
      "https://www.linkedin.com/in/musacekcen-webdeveloper",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="ourRootsContainer">
      <div className="backgroundImage"></div>
      <div className="header">
        <h1>{t("ourRoots.header")}</h1>
      </div>
      <div className="roots">
        <div className="rootImages">
          <div className="image2">
            <img src={P2} alt="image2" className="image2" />
            <div className="socialContacts">
              <NavLink className="socialIcon">
                <FaLinkedin />
              </NavLink>
              <NavLink className="socialIcon">
                <FaGithub />
              </NavLink>
            </div>
          </div>
          <div className="image3">
            <img src={P3} alt="image3" className="image3" />
            <div className="socialContacts">
              <NavLink className="socialIcon">
                <FaLinkedin />
              </NavLink>
              <NavLink className="socialIcon">
                <FaGithub />
              </NavLink>
            </div>
          </div>
          <div className="image1">
            <img src={P1} alt="image1" className="image1" />
            <div className="socialContacts">
              <NavLink
                to="#"
                onClick={handleNavLinkClick}
                className="socialIcon"
              >
                <FaLinkedin />
              </NavLink>
              <NavLink className="socialIcon">
                <FaGithub />
              </NavLink>
            </div>
          </div>
        </div>
        <div className="index">
          <p>{t("ourRoots.whoWeAre")}</p>
          <p>{t("ourRoots.description")}</p>
          <p>{t("ourRoots.ourStory")}</p>
          <p>{t("ourRoots.story")}</p>
          <p>{t("ourRoots.whatWeOffer")}</p>
          <div className="offer">
            <p>
              <span>{t("ourRoots.offerHeader1")}</span> {t("ourRoots.offer1")}
            </p>
            <p>
              <span>{t("ourRoots.offerHeader2")}</span> {t("ourRoots.offer2")}
            </p>
            <p>
              <span>{t("ourRoots.offerHeader3")}</span> {t("ourRoots.offer3")}
            </p>
            <p>
              <span>{t("ourRoots.offerHeader4")}</span> {t("ourRoots.offer4")}
            </p>
          </div>
          <p>{t("ourRoots.ourPhilosophy")}</p>
          <p>{t("ourRoots.philosophy")}</p>
          <p>{t("ourRoots.meetTheTeam")}</p>
          <p>{t("ourRoots.ourTeam")}</p>
          <p>{t("ourRoots.joinOurTeam")}</p>
          <p>{t("ourRoots.join")}</p>
          <p>{t("ourRoots.aphorism")}</p>
        </div>
      </div>
    </div>
  );
}

export default OurRoots;

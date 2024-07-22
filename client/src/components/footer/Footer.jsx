import React from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footerContainer">
      <div className="footerBox">
        <div className="aboutUs">
          <div className="header">{t("footer.headerRoots")}</div>
          <div className="links">
            <a href="">{t("footer.links1")}</a>
            <a href="">{t("footer.links2")}</a>
            <a href="">{t("footer.links3")}</a>
            <a href="">{t("footer.links4")}</a>
          </div>
        </div>
        <div className="myAccounts">
          <div className="header">{t("footer.headerAccounts")}</div>
          <div className="links">
            <a href="">{t("footer.links11")}</a>
            <a href="">{t("footer.links12")}</a>
            <a href="">{t("footer.links13")}</a>
            <a href="">{t("footer.links14")}</a>
          </div>
        </div>
        <div className="helps">
          <div className="header">{t("footer.headerHelp")}</div>
          <div className="links">
            <a href="">{t("footer.links21")}</a>
            <a href="">{t("footer.links22")}</a>
            <a href="">{t("footer.links23")}</a>
            <a href="/contact">{t("footer.links24")}</a>
          </div>
        </div>
      </div>
      <div className="rightsAndReserved">
        <p>{t("footer.rightsReserved")}</p>
        <div className="socialPlatforms">
          <FaFacebookF className="platform" />
          <FaInstagram className="platform" />
          <FaXTwitter className="platform" />
          <FaLinkedin className="platform" />
        </div>
      </div>
    </div>
  );
}

export default Footer;

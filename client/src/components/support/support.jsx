import React from "react";
import { FaTruck, FaSeedling, FaHeadset } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import "./support.css";

function Support() {
  const { t } = useTranslation();

  return (
    <div className="support-container">
      <div className="support-item">
        <FaTruck className="support-icon" />
        <p> {t("support.header1")} </p>
      </div>
      <div className="support-item">
        <FaSeedling className="support-icon" />
        <p>{t("support.header2")}</p>
      </div>
      <div className="support-item">
        <RiSecurePaymentFill className="support-icon" />
        <p>{t("support.header3")}</p>
      </div>
      <div className="support-item">
        <FaHeadset className="support-icon" />
        <p>{t("support.header4")}</p>
      </div>
    </div>
  );
}

export default Support;
